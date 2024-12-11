#!/usr/bin/env node

import * as fetch from 'node-fetch';
import { Program } from './program';

globalThis.fetch = fetch;

(async () => await Program.PostResults(process.argv[2]))();
