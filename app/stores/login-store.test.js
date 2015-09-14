import mockery from "mockery";
import nock from "nock";

import alt from "utils/alt";
import actions from "actions/login-actions";

import test from "tape";

import initDom from "utils/test/init-dom";

const mockUserResponse = {token: 123};
const mockUserError = {message: "fail"};

var store;

function beforeEach() {
	alt.flush();
}

test("setup", (t) => {
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
	initDom.stashWindow();
	t.end();
});

test("successul login", (t) => {
	beforeEach();
	t.plan(3);
	nock("http://localhost:80")
		.post("/auth/login")
		.reply(200, mockUserResponse);
	const handleChange = () => {
		store.unlisten(handleChange);
		let state = store.getState();
		t.deepEqual(state, mockUserResponse);
	};

	let state = store.getState();
	t.notok(state.user, "User null at start");
	t.notok(state.error, "Error null at start");
	store.listen(handleChange);
	actions.login();
});

test("failed login", (t) => {
	beforeEach();
	t.plan(3);
	nock("http://localhost:80")
		.post("/auth/login")
		.reply(401, mockUserError);
	const handleChange = () => {
		store.unlisten(handleChange);
		let state = store.getState();
		t.equal(state.error, "fail");
	};

	let state = store.getState();
	t.notok(state.user, "User null at start");
	t.notok(state.error, "Error null at start");
	store.listen(handleChange);
	actions.login();
});

test("login action", (t) => {
	beforeEach();
	var handlerToken;
	t.plan(1);
	nock("http://localhost:80")
		.post("/auth/login")
		.reply(200, mockUserResponse);

	var storeData = function(action) {
		t.deepEqual(action.data.user, mockUserResponse);
		alt.dispatcher.unregister(handlerToken);
	};

	handlerToken = alt.dispatcher.register(storeData);
	actions.login();
});

test("teardown", (t) => {
	mockery.disable();
	nock.enableNetConnect();
	initDom.restoreWindow();
	t.end();
});
