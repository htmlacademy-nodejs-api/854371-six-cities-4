import TsvFileReader from '../file-reader/tsv-file-reader.js';
import chalk from 'chalk';

export default class ImportCommand {
  public readonly name = '--import';

  public execute(pathToFile: string) {
    const fileReader = new TsvFileReader(pathToFile.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(chalk.bgYellow(`Не удалось импортировать данные из файла по причине: «${err.message}»`));
    }
  }
}
