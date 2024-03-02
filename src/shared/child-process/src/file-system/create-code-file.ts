import { v4 as getUUID } from 'uuid';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

if (!existsSync(join(process.cwd(), 'codes'))) {
  mkdirSync(join(process.cwd(), 'codes'));
}

if (!existsSync(join(process.cwd(), 'outputs'))) {
  mkdirSync(join(process.cwd(), 'outputs'));
}

const createCodeFile = async (language: string, code: string) => {
  const jobID = getUUID();
  const fileName: string = `${jobID}.${language}`;
  const filePath: string = join(process.cwd(), `codes/${fileName}`);

  writeFileSync(filePath, code?.toString());

  return {
    fileName,
    filePath,
    jobID,
  };
};

export { createCodeFile };
