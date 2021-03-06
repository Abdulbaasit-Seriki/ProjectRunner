#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
const colors = require('colors');
const { spawn } = require('child_process');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Gives the user an insight on how to use the CLI Tool
program
	.version('1.0.0')
	.argument('[filename]', `Name Of The File To Execute`)
	.action(() => {

		rl.question(`Please input the name of your root file      `.cyan.bold, async (filename) => {

			const name = filename || 'app.js';
			rl.pause();  

			try {  
			// Checks if the file exists on the users macjine
				await fs.promises.access(name);
			}
			catch(err) {
				throw new Error(`Can't find file ${name}`).bold.red;
			}

			let subProc;
			const startProgram = debounce(() => {

				if (subProc) {     
					subProc.kill();
				}
				console.log(`>>>>> Starting Up The Program, Please hold on...`.blue.bold.underline);
				// When startProgram is called, execute the file. The third argument(object) tells it to log all the
				// to the parent process
				subProc = spawn('node', [name], { stdio: 'inherit' });
			}, 1000);

			// Watch the current directory
			chokidar.watch('.')
				// When a file is added or chokidar sees(registers the file existence) for the first time
				.on("add", startProgram)
				.on("change", startProgram)
				// When a file is deleted
				.on("unlink", startProgram);
				rl.resume();
				rl.close();
		});
	});
program.parse(process.argv);


// Dont forget to use colors and input from the usuer