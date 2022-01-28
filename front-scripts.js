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

		document.querySelector('button').addEventListener('click', btnFunctions)
		document.getElementById('shadow').classList.remove('remove')
	}

	document.getElementById('shadow')
		.addEventListener('click', e => e.target.id === 'shadow' && closeModal())
	document.querySelectorAll('.editable').forEach(td => {
		td.addEventListener('click', e => {
			currTd = e.path[1]
			path = e.path
			openModal(currTd.href)
		})
	})
}