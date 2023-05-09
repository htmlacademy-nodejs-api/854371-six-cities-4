import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
Программа для подготовки данных для REST API сервера.

Пример: cli.js --${chalk.redBright('<command>')} [--arguments]

Команды:

 --version:                   # выводит номер версии
 --help:                      # печатает этот текст
 --import ${chalk.yellow('<path>')}:             # импортирует данные из TSV
 --generate ${chalk.blue('<n>')} ${chalk.yellow('<path>')} ${chalk.green('<url>')}  # генерирует произвольное количество тестовых данных
    `);
  }
}
