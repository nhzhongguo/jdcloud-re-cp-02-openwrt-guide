'use strict';
'require baseclass';

return baseclass.extend({
	title: '快捷入口',
	render: function() {
		var host = window.location.hostname || '192.168.8.1';
		var url = 'http://' + host + ':2017/';

		return E('div', { 'class': 'cbi-section-node' }, [
			E('a', {
				'class': 'btn cbi-button cbi-button-action',
				'href': url,
				'target': '_blank',
				'rel': 'noopener noreferrer'
			}, [ '打开 v2rayA 管理页' ]),
			E('span', {
				'style': 'margin-left: 1em; color: #666'
			}, [ url ])
		]);
	}
});
