import fs from 'fs';
import sizeOf from 'image-size';

const files = fs.readdirSync('./src');
let emmRows = []

files.forEach(file => {
	const dimensions = sizeOf(`./src/${file}`);
	emmRows.push(
		`<tr><td><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="Mundo lenovo" /></td></tr>`
	)
})

const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>ISG e pauta</title></head><body><table style="margin: auto;" border="0" cellspacing="0" cellpadding="0" bgcolor="#DDDDDD">${emmRows.join('')}</table></body></html>`

fs.writeFile('index.html', htmlContent, function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 