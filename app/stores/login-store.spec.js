import mockery from "mockery";
import nock from "nock";
import initDom from "utils/test/init-dom";

import alt from "utils/alt";
import actions from "actions/login-actions";

const mockUserResponse = {token: 123};
const mockUserError = {message: "fail"};

describe("LoginStore", () => {
	let store;

	beforeEach(() => {
		initDom.stashWindow();
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		nock.disableNetConnect();
		/**
		 * router must be mocked out from components using it,
		 * otherwise bad stuff will happen
		 */
		const	routerMock = require("utils/test/router-mock");
		mockery.registerMock("router", routerMock);

		store = require("stores/login-store");
		alt.flush();
	});

	afterEach(() => {
		mockery.disable();
		initDom.restoreWindow();
		nock.enableNetConnect();
	});

	describe("successul login", () => {
		beforeEach((done) => {
			nock("http://localhost:80")
				.post("/auth/login")
				.reply(200, mockUserResponse);
			const handleChange = () => {
				store.unlisten(handleChange);
				done();
			};

			let state = store.getState();
			should.not.exist(state.user);
			should.not.exist(state.error);
			store.listen(handleChange);
			actions.login();
		});

		it("should store user", function() {
			let state = store.getState();
			state.user.should.deep.eq(mockUserResponse);
			should.not.exist(state.error);
		});
	});

	describe("login action", () => {
		var data;
		var handlerToken;

		beforeEach((done) => {
			nock("http://localhost:80")
				.post("/auth/login")
				.reply(200, mockUserResponse);

			var storeData = function(action) {
				data = action.data;
				done();
			};

			handlerToken = alt.dispatcher.register(storeData);
			actions.login();
		});

		it("should dispatch user data", function() {
			data.user.should.deep.eq(mockUserResponse);
		});

		afterEach(()=> {
			alt.dispatcher.unregister(handlerToken);
		});
	});

	describe("failed login", () => {
		beforeEach((done) => {
			nock("http://localhost:80")
				.post("/auth/login")
				.reply(401, mockUserError);
			const handleChange = () => {
				store.unlisten(handleChange);
				done();
			};

			let state = store.getState();
			should.not.exist(state.user);
			should.not.exist(state.error);
			store.listen(handleChange);
			actions.login();
		});

		it("should store error", function() {
			let state = store.getState();
			state.error.should.eq(mockUserError.message);
		});
	});
});
