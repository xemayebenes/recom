import React, { PureComponent } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { register } from 'utils/security';
import { AuthContext } from 'modules/global/components';
import {
  Input,
  Button,
  Form,
  Label,
  Container,
  FormFeedback,
  UncontrolledAlert
} from 'reactstrap';
import styles from './RegisterForm.mod.css';
import messages from './messages';

export class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
      user: '',
      error: {}
    };
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

  handleChangeRepeatPassword = event => {
    this.handleChange('repeatPassword', event);
  };

  handleChangeUser = event => {
    this.handleChange('user', event);
  };

  validateFields = () => {
    const error = {};
    if (!this.state.email) {
      error.email = messages.required;
    }
    if (!this.state.user) {
      error.user = messages.required;
    }
    if (!this.state.password) {
      error.password = messages.required;
    }
    if (!this.state.repeatPassword) {
      error.repeatPassword = messages.required;
    }
    if (
      this.state.password &&
      this.state.repeatPassword &&
      this.state.repeatPassword !== this.state.password
    ) {
      error.repeatPassword = messages.notMatch;
    }
    if (Object.keys(error).length) {
      this.setState({ error });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = (event, fn) => {
    if (this.validateFields()) {
      event.preventDefault();
      register(this.state)
        .then(() => {
          fn();
          this.props.history.push('/');
        })
        .catch(err => {
          if (err.code === 'INVALID_EMAIL') {
            this.setState({ error: { emailInUse: true } });
          }
          if (err.code === 'INVALID_USER') {
            this.setState({ error: { userInUse: true } });
          }
        });
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ setUserId }) => (
          <Container className={styles.container}>
            <Form>
              <div className="d-flex flex-row">
                <div className=" mx-2">
                  <Label>
                    <FormattedMessage {...messages.email} />
                    <Input
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                      invalid={this.state.error.email}
                    />
                    <FormFeedback>
                      {this.state.error.email && (
                        <FormattedMessage {...this.state.error.email} />
                      )}
                    </FormFeedback>
                  </Label>
                </div>
                <div className="">
                  <Label>
                    <FormattedMessage {...messages.user} />
                    <Input
                      type="email"
                      value={this.state.user}
                      onChange={this.handleChangeUser}
                      invalid={this.state.error.user}
                    />
                    <FormFeedback>
                      {this.state.error.user && (
                        <FormattedMessage {...this.state.error.user} />
                      )}
                    </FormFeedback>
                  </Label>
                </div>
              </div>
              <div className="d-flex flex-row">
                <div className=" mx-2">
                  <Label>
                    <FormattedMessage {...messages.password} />
                    <Input
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                      invalid={this.state.error.password}
                    />
                    <FormFeedback>
                      {this.state.error.password && (
                        <FormattedMessage {...this.state.error.password} />
                      )}
                    </FormFeedback>
                  </Label>
                </div>
                <div className="">
                  <Label>
                    <FormattedMessage {...messages.repeatPassword} />
                    <Input
                      type="password"
                      value={this.state.repeatPassword}
                      onChange={this.handleChangeRepeatPassword}
                      invalid={this.state.error.repeatPassword}
                    />
                    <FormFeedback>
                      {this.state.error.repeatPassword && (
                        <FormattedMessage
                          {...this.state.error.repeatPassword}
                        />
                      )}
                    </FormFeedback>
                  </Label>
                </div>
              </div>
              <Button
                className="m-2"
                color="primary"
                onClick={event => {
                  this.handleSubmit(event, setUserId);
                }}
              >
                <FormattedMessage {...messages.register} />
              </Button>
              {this.state.error.emailInUse && (
                <UncontrolledAlert color="danger">
                  <FormattedMessage {...messages.emailInUse} />
                </UncontrolledAlert>
              )}
              {this.state.error.userInUse && (
                <UncontrolledAlert color="danger">
                  <FormattedMessage {...messages.userInUse} />
                </UncontrolledAlert>
              )}
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
)(RegisterForm);
