exports.install = function() {
	GROUP(['authorize'], function() {
		ROUTE('/');
	});
	FILE('/openplatform.json', meta);
};

function meta(req, res) {
	res.file(PATH.root('openplatform.json'));
}