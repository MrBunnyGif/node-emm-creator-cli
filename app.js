import fs from 'fs';
import sizeOf from 'image-size';

const files = fs.readdirSync('./src');
const fileTitle = 'titulo do email'

let emmRows = []
let rowWithColumns = []
let rowWithColumnsDimensions = []
let largestWidth = sizeOf(`./src/${files[0]}`).width;

function renderTable(rows) {
	return `<table style="margin: auto;" border="0" cellspacing="0" cellpadding="0" bgcolor="#DDDDDD">${rows.join('')}</table>`
}

function isRowComplete(dimensions) {
	return dimensions.reduce((a, b) => a + b, 0) === largestWidth
}

function getEmailSize(files) {
	files.forEach(file => {
		const dimensions = sizeOf(`./src/${file}`);
		if (dimensions.width > largestWidth)
			largestWidth = dimensions.width
	})
}

function joinImages(files) {
	files.forEach(file => {
		const dimensions = sizeOf(`./src/${file}`);
		const tdElement = `<td><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="${fileTitle}" /></td>`

		if (dimensions.width < largestWidth) {
			rowWithColumnsDimensions.push(dimensions.width)
			rowWithColumns.push(`${tdElement}`)
		}
		if (isRowComplete(rowWithColumnsDimensions)) {
			console.log('is complete: ', rowWithColumnsDimensions)
			emmRows.push(
				`<tr><td>${renderTable(rowWithColumns)}</td></tr>`
			)
			rowWithColumns = []
			rowWithColumnsDimensions = []
		}
		if(dimensions.width >= largestWidth)
		emmRows.push(
			`<tr>${tdElement}</tr>`
		)
	})
}

getEmailSize(files)
joinImages(files)


const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${fileTitle}</title></head><body>${renderTable(emmRows)}</body></html>`

fs.writeFile('index.html', htmlContent, function (err) {
	if (err) throw err;
}); 