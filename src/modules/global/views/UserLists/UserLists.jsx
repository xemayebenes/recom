import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import getLists from 'gql/getLists.gql';

export class UserLists extends PureComponent {
  static displayName = 'UserLists';

  goToItemDetail = (id, type) => {
    const route = `/item-detail/${type.toLowerCase()}/${id}`;
    this.props.history.push(route);
  };

  goToListDetail = id => {
    const route = `/lists/${id}`;
    this.props.history.push(route);
  };

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
                    <Col
                      xs="12"
                      md="6"
                      lg="4"
                      key={list.id}
                      className="border"
                      onClick={() => this.goToListDetail(list.id)}
                    >
                      <div>
                        {list.type === 'Movie' && (
                          <FontAwesomeIcon icon={faFilm} />
                        )}
                        {list.type === 'Serie' && (
                          <FontAwesomeIcon icon={faTv} />
                        )}
                        {'   '}
                        {list.name}
                      </div>
                      <Row>
                        {list.items.slice(0, 4).map(item => (
                          <Col xs="6" key={item.id}>
                            <img
                              src={item.images.small.main}
                              alt="main"
                              onClick={event => {
                                event.stopPropagation();

                                this.goToItemDetail(item.id, list.type);
                              }}
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
