#!/usr/bin/env node
import * as yargs from 'yargs';
import Viewer from './viewer';

yargs.command(Viewer)
     .demandCommand(1)
     .help('help').argv;
