import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { login } from 'utils/security';

export class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleChangeEmail = event => {
    this.handleChange('email', event);
  };

  handleChangePassword = event => {
    this.handleChange('password', event);
  };

  handleSubmit = event => {
    event.preventDefault();
    login(this.state)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default compose(
  withRouter,
  injectIntl
)(LoginForm);
