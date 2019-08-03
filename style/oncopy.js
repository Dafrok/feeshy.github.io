	var d = new Date();
	var url = window.location.href;
document.body.oncopy = event => {
	event.preventDefault();
	var copy = window.getSelection(0).toString();
	var copied;
	if (copy.length > 35) {
		copied = '#' + document.title + '\n' 
		+ '- - -\n'
		+ copy + '\n'
		+ '- - -\n'
		+ 'Author: @feeshy \n'
		+ url + '\n'
		+ 'Snapshot on ' + d.toLocaleDateString() + '\n';
	}
	else {
		copied = copy;
	}
	if (event.clipboardData) {
		return event.clipboardData.setData('text', copied);
	}
	else {
		return window.clipboardData.setData("text", copied);
	}
}