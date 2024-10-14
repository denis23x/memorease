/** @format */

import prompts from 'prompts';
import { spawn } from 'child_process';
import jsdom from 'jsdom';
import fs from 'node:fs';

(async () => {
	const sprite = await prompts({
		type: 'select',
		name: 'sprite',
		message: 'Select a sprite',
		initial: 0,
		choices: [
			{
				title: 'Bootstrap',
				value: 'bootstrap',
				description: 'Build sprite of Bootstrap icons'
			}
		]
	});

	if (sprite.sprite === 'bootstrap') {
		const run = spawn(
			'svg2sprite ./src/assets/icons ./src/assets/sprite.svg --inline --stripAttrs class --stripAttrs fill --stripAttrs xmlns',
			{
				shell: true,
				stdio: 'inherit'
			}
		);

		run.on('close', () => {
			fs.readFile('./src/assets/sprite.svg', 'utf8', (error, sprite) => {
				if (error) {
					throw error;
				}

				jsdom.JSDOM.fromFile('./public/index.html').then(dom => {
					// @ts-ignore
					dom.window.document.querySelector("[data-sprite='bootstrap']").innerHTML = sprite.trim();

					fs.writeFile('./public/index.html', dom.serialize(), error => {
						if (error) {
							throw error;
						}

						spawn('prettier --write index.html --log-level silent', {
							shell: true,
							stdio: 'inherit'
						});
					});
				});
			});
		});
	} else {
		console.log('Ok, Bye!');
	}
})();
