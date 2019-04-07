// Open sessions
REPO.sessions = {};

// A cleaner for expired sessions
ON('service', function(counter) {
	if (counter % 10 === 0) {
		var keys = Object.keys(REPO.sessions);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (REPO.sessions[key].expire < NOW)
				delete REPO.sessions[key];
		}
	}
});

// Simple authorization
AUTH(function($) {

	var op = $.query.openplatform;
	if (!op || op.length < 20) {
		$.invalid();
		return;
	}

	$.query.openplatform = undefined;

	var key = 'session' + op.hash();

	if (REPO.sessions[key]) {
		$.success(REPO.sessions[key]);
		return;
	}

	RESTBuilder.url(op).exec(function(err, user) {
		if (user.id) {

			var profile = user.profile;
			profile.openplatformid = (user.openplatformid + '');

			if (profile.directoryid)
				profile.openplatformid = (profile.openplatformid + '-' + profile.profile.directoryid).crc32(true);

			profile.ip = $.ip;
			REPO.sessions[key] = profile;
			$.success(profile);

		} else
			$.invalid();
	});
});