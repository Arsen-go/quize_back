import { unlinkSync } from 'fs';
import { join } from 'path';

const removeCodeFile = async (
  uuid: string,
  lang: string,
  outputExt: string,
) => {
  const codeFile = join(process.cwd(), `codes/${uuid}.${lang}`),
    outputFile = join(process.cwd(), `outputs/${uuid}.${outputExt}`); // TODO

  unlinkSync(codeFile);

  if (outputExt) unlinkSync(outputFile);
};

export { removeCodeFile };
