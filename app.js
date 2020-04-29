#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');

const startProgram = debounce(() => {
	console.log(`Starting Up The Program`);
}, 1000);
// Watch the current directory
chokidar.watch('.')
	// When a file is added or chokidar sees(registers the file existence) for the first time
	.on("add", startProgram)
	.on("change", () => console.log(`File Changed`))
	// When a file is deleted
	.on("unlink", () => console.log(`File Deleted`));