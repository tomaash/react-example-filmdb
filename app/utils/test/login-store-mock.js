console.log("in login store mock");
import alt from "utils/alt";
import LoginActions from "actions/login-actions";

class LoginStoreMock {
	constructor() {
		this.bindActions(LoginActions);
		this.user = null;
		this.error = null;
	}

	onLogin(data) {
		console.log(data);
		this.user = true;
	}

	onRegister(data) {
		console.log(data);
		this.user = true;
	}

	onLogout() {
		this.user = false;
	}
}

module.exports = (alt.createStore(LoginStoreMock));
