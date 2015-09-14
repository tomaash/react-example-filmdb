import React from "react/addons";

export default function(component, props, ...children) {
	const shallowRenderer = React.addons.TestUtils.createRenderer();
	shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
	return shallowRenderer.getRenderOutput();
}
