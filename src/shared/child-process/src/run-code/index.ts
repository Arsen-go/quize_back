import { commandMap, supportedLanguages } from './instructions';
import { createCodeFile } from '../file-system/create-code-file';
import { removeCodeFile } from '../file-system/remove-code-file';
import { info } from './info';

import { spawn } from 'child_process';

async function runCode({
  language = '',
  code = '',
  input = '',
}: {
  language: string;
  code: string;
  input: string;
}) {
  try {
    const timeout: number = 30;

    if (!code.trim()) {
      throw {
        status: 400,
        error: 'No code found to execute.',
      };
    }

    if (!supportedLanguages.includes(language)) {
      throw {
        status: 400,
        error: `Please enter a valid language. Supported languages: ${supportedLanguages.join(
          ', ',
        )}.`,
      };
    }

    const { jobID }: { jobID: string } = await createCodeFile(language, code);
    const {
      compileCodeCommand,
      compilationArgs,
      executeCodeCommand,
      executionArgs,
      outputExt,
    } = commandMap(jobID, language);

    if (compileCodeCommand) {
      await new Promise<void>((resolve, reject) => {
        const compileCode = spawn(compileCodeCommand, compilationArgs || []);
        compileCode.stderr.on('data', (error) => {
          reject({
            status: 200,
            output: '',
            error: error.toString(),
            language,
          });
        });
        compileCode.on('exit', () => {
          resolve();
        });
      });
    }

    const result: any = await new Promise((resolve, reject) => {
      // start a new process
      const executeCode = spawn(executeCodeCommand, executionArgs || []);
      let output: string = '',
        error: string = '';

      const timer = setTimeout(async () => {
        // to end(kill) child process
        executeCode.kill('SIGHUP');

        await removeCodeFile(jobID, language, outputExt);

        reject({
          status: 408,
          error: `Your code took too long to execute, over ${timeout} seconds. Make sure you are sending input as payload if your code expects an input.`,
        });
      }, timeout * 1000);

      if (input) {
        input.split('\n').forEach((line) => {
          executeCode.stdin.write(`${line}\n`);
        });

        executeCode.stdin.end();
      }

      // events

      executeCode.stdin.on('error', (err) => {
        console.log('stdin err', err);
      });

      executeCode.stdout.on('data', (data) => {
        output += data.toString();
      });

      executeCode.stderr.on('data', (data) => {
        error += data.toString();
      });

      executeCode.on('exit', (err) => {
        clearTimeout(timer);
        resolve({ output, error });
      });
    });

    await removeCodeFile(jobID, language, outputExt);

    return {
      ...result,
      language,
      info: await info(language),
    };
  } catch (error) {
    console.log('🚀 ~ runCode ~ error:', error);
  }
}

export { runCode };
