import React, { PureComponent, Fragment } from 'react';
import { AuthContext } from 'modules/global/components';
import { getUserId } from 'utils/security';

export default React.createContext({
  userId: null
});

export class AuthContextProvider extends React.Component {
  state = { userId: getUserId() };

  setUserId = () => {
    this.setState({ userId: getUserId() });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{ userId: this.state.userId, setUserId: this.setUserId }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
