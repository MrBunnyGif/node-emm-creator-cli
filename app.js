import fs from 'fs';
import sizeOf from 'image-size';

const files = fs.readdirSync('./src');
const fileTitle = 'titulo do email'
let emmRows = []
let rowWithColumns = []

files.forEach(file => {
	const dimensions = sizeOf(`./src/${file}`);
	if (dimensions.width < 600)
		rowWithColumns.push(
			`<td><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="${fileTitle}" /></td>`
		)
	else if (dimensions.width >= 600 && rowWithColumns.length) {
		emmRows.push(
			`<tr><td><table style="margin: auto;" border="0" cellspacing="0" cellpadding="0" bgcolor="#DDDDDD"><tr>${rowWithColumns.join('')}</td></table></td></tr>`
		)
		emmRows.push(
			`<tr><td><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="${fileTitle}" /></td></tr>`
		)
		rowWithColumns = []
	}
	else
		emmRows.push(
			`<tr><td><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="${fileTitle}" /></td></tr>`
		)
})
console.log('rowWithColumns: ', rowWithColumns.length)

const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${fileTitle}</title></head><body><table style="margin: auto;" border="0" cellspacing="0" cellpadding="0" bgcolor="#DDDDDD">${emmRows.join('')}</table></body></html>`

fs.writeFile('index.html', htmlContent, function (err) {
	if (err) throw err;
}); 