import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import { Row, Col, Container, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';
import { ContainerScrollHorizontal, Loader } from 'modules/global/components';
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

  // <Row>
  //   <Col className="my-2">
  //     <Button
  //       size="sm"
  //       color="primary"
  //       onClick={this.goToNewListForm}
  //       className="float-right"
  //     >
  //       New List
  //     </Button>
  //   </Col>
  // </Row>
  render() {
    return (
      <Fragment>
        <div
          className={classnames(
            styles.header,
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          <div>YOUR LISTS</div>
        </div>
        <div className={styles.container}>
          <Query
            variables={{ userId: this.props.user.userId }}
            query={getLists}
          >
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return <p>Error :</p>;

              return (
                <Fragment>
                  <div>
                    {data.lists.map(list => (
                      <div
                        className={styles.list}
                        key={list.id}
                        onClick={() => this.goToListDetail(list.id)}
                      >
                        <div className="text-left pl-5 bg-light">
                          {list.name}
                        </div>

                        <ContainerScrollHorizontal>
                          {list.items.map(item => (
                            <div className={styles.card}>
                              <img
                                key={item.id}
                                src={item.images.medium.main}
                                className={styles.image}
                                alt="main"
                                onClick={event => {
                                  event.stopPropagation();

                                  this.goToItemDetail(item.id, list.type);
                                }}
                              />
                              <div className={styles.cardBottom}>
                                <div className="text-right mr-2">
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          ))}
                        </ContainerScrollHorizontal>
                      </div>
                    ))}
                  </div>
                </Fragment>
              );
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(UserLists);
