import React from 'react';
import AltContainer from 'alt/AltContainer';

import LoginStore from 'stores/login-store';

import LoginPage from './login-page';

export default class Login extends React.Component {
	render() {
		return (
			<AltContainer
				stores={{
					LoginStore: LoginStore
				}}>
				<LoginPage/>
			</AltContainer>
		);
	}
}
