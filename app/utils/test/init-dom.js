var jsdom = require("jsdom");
var sinon = require("sinon");

module.exports = {
	run: function() {
		delete global.document;
		delete global.window;
		delete global.navigator;
		global.document = jsdom.jsdom();
		global.window = document.defaultView;
		global.navigator = global.window.navigator;
	},

	stashWindow: function() {
		global._window = global.window;
		global.window = undefined;
	},

	restoreWindow: function() {
		global.window = global._window;
		global._window = undefined;
	},

	fakeLocalStorage: function() {
		global.localStorage = {
			getItem: sinon.spy(),
			setItem: sinon.spy(),
			removeItem: sinon.spy()
		};
	}
};
