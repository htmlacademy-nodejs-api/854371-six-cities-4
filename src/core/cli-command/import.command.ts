import TsvFileReader from '../file-reader/tsv-file-reader.js';
import { createOffer } from '../../common/offers.js';
import { getErrorMessage } from '../../common/utils.js';

export default class ImportCommand {
  public readonly name = '--import';

  private oneLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComlete(count: number) {
    console.log(`${count} rows imported`);
  }

  public async execute(pathToFile: string): Promise<void> {
    const fileReader = new TsvFileReader(pathToFile.trim());

    fileReader.on('line', this.oneLine);
    fileReader.on('end', this.onComlete);

    try {
      await fileReader.read();
    } catch (error) {
      console.log(`Can't read the file: ${getErrorMessage(error)}`);
    }
  }
}
