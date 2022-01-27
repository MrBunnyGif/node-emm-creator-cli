import fs from 'fs';
import sizeOf from 'image-size';

const files = fs.readdirSync('./src');
const fileTitle = 'titulo do email'

let emmRows = []
let rowWithColumns = []
let rowWithColumnsDimensions = []
let largestWidth = sizeOf(`./src/${files[0]}`).width;

function scriptFunction() {
	let urlValue
	let currTd
	let hasLink = false

	function closeModal() {
		document.getElementById('shadow').classList.add('remove')

		if (urlValue && !hasLink) {
			currTd.innerHTML = `<a href="${urlValue}" target="_blank">${currTd.innerHTML}</a>`
		}
		else if (hasLink) {
			currTd.href = urlValue
		}

		urlValue = undefined
		currTd = undefined
		hasLink = false
	}
	function btnFunctions() {
		const input = document.querySelector('input')
			urlValue = input.value
			closeModal()
	}
	function openModal(url) {
		const input = document.querySelector('input')

		url ? hasLink = true : null
		input.value = url || "https://"

		document.querySelector('button').addEventListener('click', btnFunctions)
		document.getElementById('shadow').classList.remove('remove')
	}

	document.getElementById('shadow')
		.addEventListener('click', e => e.target.id === 'shadow' && closeModal())
	document.querySelectorAll('.editable').forEach(td => {
		td.addEventListener('click', e => {
			currTd = e.path[1]
			openModal(currTd.href)
		})
	})
}
const script = scriptFunction.toString()

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


const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${fileTitle}</title><style>div#shadow{position:fixed;top:0;bottom:0;left:0;display:flex;right:0;background:#0000006b;justify-content:center;align-items:center}div#card{background:#fff;width:max-content;padding:40px;border-radius:8px}.remove{display:none!important}</style></head><body><div id="shadow" class="remove"><div id="card"><input placeholder="Insira o link da imagem" /><button>linkar</button></div></div>${renderTable(emmRows)}<script>(${script})()</script></body></html>`

fs.writeFile('index.html', htmlContent, function (err) {
	if (err) throw err;
}); 