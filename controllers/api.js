exports.install = function() {
	GROUP(['authorize'], function() {
		// With custom action
		ROUTE('GET          /api/logoff/',          logoff);
	});
};

// Releases memory
function logoff() {
	var self = this;
	var session = REPO.sessions[self.user.id];
	var keys = Object.keys(REPO.sessions);
	for (var i = 0; i < keys.length; i++) {
		if (REPO.sessions[keys[i]] === session)
			delete REPO.sessions[keys[i]];
	}
	self.empty();
}