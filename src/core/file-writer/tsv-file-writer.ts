import { FileWriterInterface } from './file-writer.interface.js';
import { createWriteStream, WriteStream } from 'node:fs';

const CHUNK_SIZE = 65536;

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly fileName: string) {
    this.stream = createWriteStream(this.fileName, {
      encoding: 'utf-8',
      highWaterMark: CHUNK_SIZE,
      flags: 'w',
      autoClose: true
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
