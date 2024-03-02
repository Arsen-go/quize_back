import { commandMap } from './instructions';
import util from 'util';

const exec = util.promisify(require('child_process').exec);

const info = async (language: string) => {
  const { compilerInfoCommand } = commandMap('', language);

  const { stdout } = await exec(compilerInfoCommand);

  return stdout;
};

export { info };
