#!/usr/bin/env node

import 'reflect-metadata';
import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/help.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';
import GenerateCommand from './core/cli-command/generate.command.js';

const myManager = new CLIApplication();
myManager.registerCommand([
  new HelpCommand, new VersionCommand, new ImportCommand, new GenerateCommand
]);

myManager.processCommand(process.argv);
