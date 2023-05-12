import { FileReaderInterface } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 16184;

export default class TsvFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public fileName: string) {
    super();
  }

  public async read() {
    const stream = createReadStream(this.fileName, {
      encoding: 'utf-8',
      highWaterMark: CHUNK_SIZE,
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
