import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import { compose } from 'recompose';
import { Button, Container, Row, Col } from 'reactstrap';

import { MOVIE, SERIE } from 'modules/constants';

import IMPORT_LIST from 'gql/importList.gql';
import getLists from 'gql/getLists.gql';

export class ImportList extends PureComponent {
  componentDidMount = async () => {
    console.log('componentDidMount', this.props.match.params.listId);
    const res = await this.props.client
      .mutate({
        mutation: IMPORT_LIST,
        variables: {
          listId: this.props.match.params.listId,
          userId: this.props.user.userId
        },
        refetchQueries: [
          {
            query: getLists,
            variables: {
              userId: this.props.user.userId
            }
          }
        ]
      })
      .catch(err => {
        console.log(err);
        // TODO SET ERROR STATE
      });
    if (res && res.data && res.data.importList) {
      this.props.history.push(`/lists/${res.data.importList.id}`);
    }

    //TODO OPTIMISTIC RESPONSE
  };

  render() {
    return <Container>Importing list</Container>;
  }
}
export default compose(
  withRouter,
  withApollo,
  injectIntl
)(ImportList);
