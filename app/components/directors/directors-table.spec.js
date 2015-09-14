import React from "react/addons";

import getWrappedComponent from "utils/test/get-wrapped-component";
import initDom from "utils/test/init-dom";

import mockery from "mockery";
import nock from "nock";

import alt from "utils/alt";

import DirectorsTable from "components/directors/directors-table";

const TestUtils = React.addons.TestUtils;

describe("Directors table", () => {

	var instance;
	var component;

	beforeEach(() => {
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		alt.bootstrap(JSON.stringify({
			DirectorsStore: {directors: [
				{name: 'foo'},
				{name: 'bar'}
			]}
		}));
		component = React.render(<DirectorsTable/>, document.body);
		instance = getWrappedComponent(component);
		initDom.stashWindow();
	});

	afterEach(() => {
		mockery.disable();
		initDom.restoreWindow();
		nock.enableNetConnect();

		alt.flush();
		React.unmountComponentAtNode(document.body);
	});
	it("should render directors", function() {
		const fields = TestUtils.scryRenderedDOMComponentsWithTag(instance, "tr");
		// Table has 3 lines
		fields.length.should.eq(3);
		// Text content should match
		fields[1].props.children[0].props.children.should.eq("foo");
		fields[2].props.children[0].props.children.should.eq("bar");
	});
	it("should render action buttons", function() {
		const fields = TestUtils.scryRenderedDOMComponentsWithClass(instance, "action-buttons");
		fields.length.should.eq(2);
	});

});

