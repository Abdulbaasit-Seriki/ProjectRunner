#!/usr/bin/env node

const chokidar = require('chokidar');

// Watch the current directory
chokidar.watch('.')
	// When a file is added or chokidar sees(registers the file existence) for the first time
	.on("add", () => console.log(`File Added`))
	.on("change", () => console.log(`File Changed`))
	// When a file is deleted
	.on("unlink", () => console.log(`File Deleted`));