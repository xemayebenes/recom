import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { login } from 'utils/security';
import { AuthContext } from 'modules/global/components';
import { Input, Button, Form, Label, Container } from 'reactstrap';
import styles from './LoginForm.mod.css';

export class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: false };
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

  handleSubmit = (event, fn) => {
    event.preventDefault();
    login(this.state)
      .then(() => {
        fn();
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.code === 'INVALID_CREDENTIALS') {
          this.setState({ error: true });
        }
      });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ setUserId }) => (
          <Container className={styles.container}>
            <Form>
              <div className="d-flex flex-row">
                <div className="mx-2">
                  <Label>
                    Email
                    <Input
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                    />
                  </Label>
                </div>
                <div className="">
                  <Label>
                    Password
                    <Input
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                    />
                  </Label>
                </div>
                {this.state.error && (
                  <div>
                    <span> The credentials are invalid </span>
                  </div>
                )}
              </div>
              <Button
                className="m-2"
                color="primary"
                onClick={event => {
                  this.handleSubmit(event, setUserId);
                }}
              >
                Login
              </Button>
            </Form>
          </Container>
        )}
      </AuthContext.Consumer>
    );
  }
}
export default compose(
  withRouter,
  injectIntl
)(LoginForm);
