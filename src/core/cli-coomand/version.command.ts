import { CliCommandInterface } from './cli-command.interface.js';
import path from 'node:path';
import { readFileSync } from 'node:fs';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPageJSON = readFileSync(path.resolve('./package.json'), 'utf-8');
    const objecrFormJSON = JSON.parse(contentPageJSON);
    return objecrFormJSON.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(version);
  }
}
