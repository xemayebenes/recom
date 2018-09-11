import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container } from 'reactstrap';

import getLists from 'gql/getLists.gql';

export class UserLists extends PureComponent {
  static displayName = 'UserLists';

  goToItemDetail = (id, type) =>
    this.props.history.push(`/item-detail/${type.toLowerCase()}/${id}`);

  render() {
    return (
      <Container>
        <Query variables={{ userId: this.props.user.userId }} query={getLists}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Fragment>
                <Row className="m-3">
                  {data.lists.map(list => (
                    <Col xs="12" md="6" lg="4" key={list.id} className="border">
                      <div>{list.name}</div>
                      <div>{list.type}</div>
                      <Row>
                        {list.items.slice(0, 4).map(item => (
                          <Col xs="6" key={item.id}>
                            <img
                              src={item.images.small.main}
                              alt="main"
                              onClick={() =>
                                this.goToItemDetail(item.id, list.type)
                              }
                            />
                            <div> {item.title} </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(UserLists);
