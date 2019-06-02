﻿WebFontConfig = {
	google: {
		families: [ 'EB Garamond:400,600:latin', 'Noto Serif SC:400,600:chinese-simplified' ]
	},
	timeout: 3000
};

(function(d) {
	var wf = d.createElement('script'), s = d.scripts[0];
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
	wf.async = true;
	s.parentNode.insertBefore(wf, s);
})(document);