import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import { Loader } from 'modules/global/components';
import { UserListItem } from 'modules/items/components';
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
      <Fragment>
        <div
          className={classnames(
            styles.header,
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          <div>YOUR LISTS</div>
        </div>
        <div className="m-3">
          <div className="d-flex justify-content-end">
            <Button
              size="sm"
              color="primary"
              onClick={this.goToNewListForm}
              className="float-right"
            >
              <div className="d-flex align-items-baseline">
                <div className="mr-3 fa-xs">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className="text-uppercase"> New list</div>
              </div>
            </Button>
          </div>
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
                <div>
                  {data.lists.map(list => (
                    <UserListItem
                      key={list.id}
                      id={list.id}
                      list={list}
                      onClick={this.goToListDetail}
                      onClickItemDetail={this.goToItemDetail}
                    />
                  ))}
                </div>
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
