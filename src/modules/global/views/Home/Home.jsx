import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query } from 'react-apollo';
import { Row, Col } from 'reactstrap';

import getUserLastItems from 'gql/getUserLastItems.gql';

export class Home extends PureComponent {
  static displayName = 'Home';

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  state = {};

  render() {
    return (
      <Fragment>
        <div> Home </div>
        <Query
          variables={{ userId: '5b15b7a9379a6b763911c023' }}
          query={getUserLastItems}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.getUserLastItems.map(({ id, type, date, item }) => (
              <Row key={id}>
                <Col>
                  <img src={item.images.main} alt="main" />
                </Col>
                <Col>{item.title}</Col>
                <Col>{type}</Col>
                <Col>{item.overview}</Col>
                <Col>{new Date(date).toISOString()}</Col>
              </Row>
            ));
          }}
        </Query>
      </Fragment>
    );
  }
}

export default injectIntl(Home);
