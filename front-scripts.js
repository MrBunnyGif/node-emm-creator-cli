module.exports = () => {
	let urlValue
	let currTd
	let path = []
	let hasLink = false

	function closeModal() {
		document.getElementById('shadow').classList.add('remove')

		if (urlValue && !hasLink) {
			currTd.innerHTML = `<a href="${urlValue}" target="_blank">${currTd.innerHTML}</a>`
		}
		else if (urlValue && hasLink) {
			currTd.href = urlValue
		}
		else if (urlValue === '' && hasLink) {
			path[2].innerHTML = path[1].innerHTML
		}

		urlValue = undefined
		currTd = undefined
		hasLink = false
		document.querySelector('input').value = ''
	}
	function btnFunctions() {
		const input = document.querySelector('input')
		urlValue = input.value
		closeModal()
	}
	function openModal(url) {
		const input = document.querySelector('input')

		url ? hasLink = true : null
		if (url) {
			input.value = url
		}

		document.querySelector('#anchor-btn').addEventListener('click', btnFunctions)
		document.getElementById('shadow').classList.remove('remove')
	}

	function exportEmm() {
		var aFileParts = [`<html><head><title>titulo do email</title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><style type="text/css">body{margin:0;padding:0;background-color:#d0d4d7;border-spacing:0;border:0}*{border:0;padding:0}a{outline:0}td>div{line-height:0}div{display:block!important}</style></head><body>${document.querySelector('table').outerHTML}</body></html>`];
		let file = new Blob(aFileParts, { type: 'text/html' });
		let a = document.createElement("a"),
			url = URL.createObjectURL(file);

		a.href = url;
		a.download = 'emm';
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}

	document.getElementById('shadow').addEventListener('click', e => e.target.id === 'shadow' && closeModal())
	document.querySelectorAll('.editable').forEach(td => {
		td.addEventListener('click', e => {
			currTd = e.path[1]
			path = e.path
			openModal(currTd.href)
		})
	})
	document.querySelector('#export-btn').addEventListener('click', exportEmm)
}