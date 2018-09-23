import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import { Row, Col, Container, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';
import { ContainerTemplate } from 'modules/global/components';
import getLists from 'gql/lists/getLists.gql';

import styles from './UserLists.mod.css';

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

  goToNewListForm = () => this.props.history.push('/lists/new');

  render() {
    return (
      <ContainerTemplate title={<div>YOUR LISTS</div>}>
        <Row>
          <Col
            xs={{ size: 1, offset: 9 }}
            md={{ size: 1, offset: 11 }}
            className="my-2"
          >
            <Button size="sm" color="primary" onClick={this.goToNewListForm}>
              New List
            </Button>
          </Col>
        </Row>
        <Row>
          <Query
            variables={{ userId: this.props.user.userId }}
            query={getLists}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return (
                <Fragment>
                  <Row className="flex-wrap flex-row justify-content-start d-flex">
                    {data.lists.map(list => (
                      <div
                        key={list.id}
                        className="m-3 shadow flex-wrap flex-column d-flex align-items-start"
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
                        <div className="m-3 flex-wrap flex-row justify-content-between d-flex">
                          {list.items.slice(0, 4).map(item => (
                            <div key={item.id}>
                              <img
                                src={item.images.small.main}
                                alt="main"
                                onClick={event => {
                                  event.stopPropagation();

                                  this.goToItemDetail(item.id, list.type);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </Row>
                </Fragment>
              );
            }}
          </Query>
        </Row>
      </ContainerTemplate>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(UserLists);
