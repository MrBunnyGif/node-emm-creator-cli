const fs = require('fs')
const sizeOf = require('image-size');
const scriptFunction = require('./front-scripts')

const files = fs.readdirSync('./src');
const fileTitle = 'titulo do email'
const script = scriptFunction.toString()

let emmRows = []
let rowWithColumns = []
let rowWithColumnsDimensions = []
let largestWidth = sizeOf(`./src/${files[0]}`).width;
let htmlContent = ''

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
	files.forEach((file, i) => {
		const dimensions = sizeOf(`./src/${file}`);
		const tdElement = `<td class="editable"><img style="display: block; border: 0;" align="top" width="${dimensions.width}" height="${dimensions.height}"	src="/src/${file}" alt="${fileTitle}" /></td>`

		if (dimensions.width < largestWidth) {
			rowWithColumnsDimensions.push(dimensions.width)
			rowWithColumns.push(`${tdElement}`)
		}
		if (isRowComplete(rowWithColumnsDimensions)) {
			emmRows.push(
				`<tr><td>${renderTable(rowWithColumns)}</td></tr>`
			)
			rowWithColumns = []
			rowWithColumnsDimensions = []
		}
		else if (dimensions.width >= largestWidth)
			emmRows.push(
				`<tr>${tdElement}</tr>`
			)
	})
}

getEmailSize(files)
joinImages(files)

fs.readFile('./editor.html', 'utf8', async (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	htmlContent = data + `${renderTable(emmRows)}<script>(${script})()</script></body></html>`
	fs.writeFile('index.html', htmlContent, function (err) {
		if (err) throw err;
	});
})