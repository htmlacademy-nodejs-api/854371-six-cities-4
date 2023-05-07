#!/usr/bin/env node

import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-coomand/help.command.js';
import VersionCommand from './core/cli-coomand/version.command.js';
import ImportCommand from './core/cli-coomand/import.command.js';

const myManager = new CLIApplication();
myManager.registerCommand([
  new HelpCommand, new VersionCommand, new ImportCommand
]);

myManager.processCommand(process.argv);
