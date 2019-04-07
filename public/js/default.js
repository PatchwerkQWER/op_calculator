var common = {};

// Initializes
OP.init(function(err) {

	if (err) {
		document.body.innerHTML = '401: <b>Unauthorized</b>';
		return;
	}

	var tokenize = function(opt) {
		if (opt.url && opt.url.lastIndexOf('.html') === -1)
			opt.url = OP.tokenizator(opt.url);
	};

	// Adds auth-token to each request
	// Auth
	ON('request', tokenize);
	SET('common.ready', true, 500);
});

// Releases session
OP.on('close', function() {
	AJAX('GET /api/logoff/');
});