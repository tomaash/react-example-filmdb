import React from "react/addons";

import getWrappedComponent from "utils/test/get-wrapped-component";
import initDom from "utils/test/init-dom";

import mockery from "mockery";
import nock from "nock";
import axios from "axios";

const TestUtils = React.addons.TestUtils;

const mockLogin = {
	username: "foo",
	password: "bar"
};

const mockUserResponse = {token: 123};

describe("Login", () => {

	var instance;
	var component;

	beforeEach(() => {
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		nock.disableNetConnect();

		const	routerMock = require("utils/test/router-mock");
		mockery.registerMock("router", routerMock);

		const Login = require("components/login");
		component = React.render(<Login/>, document.body);
		instance = getWrappedComponent(component);

		initDom.stashWindow();
	});

	afterEach(() => {
		mockery.disable();
		initDom.restoreWindow();
		nock.enableNetConnect();
		React.unmountComponentAtNode(document.body);
	});
	it("should have input fields", function() {
		const fields = TestUtils.scryRenderedDOMComponentsWithTag(instance, "input");
		fields.length.should.eq(2);
	});

});

