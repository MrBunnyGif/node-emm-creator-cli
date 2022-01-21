import fs from 'fs';
import sizeOf from 'image-size';
import copy from 'copy-to-clipboard';

const files = fs.readdirSync('./src');
let html = []

files.forEach(file => {
	const dimensions = sizeOf(`./src/${file}`);
	html.push(
		`<tr><td><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="Mundo lenovo" /></td></tr>`
	)
})
console.log("🚀 ~ file: app.js ~ line 6 ~ html", html)
// copy('oioi')