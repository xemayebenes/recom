import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container } from 'reactstrap';
import { ActionsPanel } from 'modules/items/components';

import getUserSeries from 'gql/getUserSeries.gql';
import removeSerie from 'gql/removeSerie.gql';
import completeMovie from 'gql/completeMovie.gql';

import getUserLastItems from 'gql/getUserLastItems.gql';

import styles from './Series.mod.css';
export class Series extends PureComponent {
  static displayName = 'Series';

  goToItemDetail = id => this.props.history.push(`/item-detail/serie/${id}`);

  updateList = (cache, userId, id) => {
    const data = cache.readQuery({
      query: getUserSeries,
      variables: {
        userId: this.props.user.userId
      }
    });

    cache.writeQuery({
      query: getUserSeries,
      variables: {
        userId: this.props.user.userId
      },
      data: {
        getUserSeries: data.getUserSeries.filter(li => li.id !== id)
      }
    });
  };

  handleDeleteItem = async id => {
    await this.props.client.mutate({
      mutation: removeSerie,
      variables: { id },
      refetchQueries: [
        {
          query: getUserLastItems,
          variables: {
            userId: this.props.user.userId
          }
        }
      ],
      update: (cache, { data: { removeSerie } }) => {
        this.updateList(cache, this.props.user.userId, id);
      }
    });
  };
  handleCompleteMovie = async id => {
    await this.props.client.mutate({
      mutation: completeMovie,
      variables: { id },
      refetchQueries: [
        {
          query: getUserLastItems,
          variables: {
            userId: this.props.user.userId
          }
        }
      ]
    });
  };

  render() {
    return (
      <Container>
        <Query
          variables={{ userId: this.props.user.userId }}
          query={getUserSeries}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Fragment>
                <Row>
                  {data.getUserSeries.map(serie => (
                    <Col xs="12" md="6" lg="4" key={serie.id}>
                      <Row>
                        <ActionsPanel
                          onClickDeleteButton={() =>
                            this.handleDeleteItem(serie.id)
                          }
                          onClickCompleteButton={() =>
                            this.handleCompleteMovie(serie.id)
                          }
                          completed={serie.completed}
                        />
                      </Row>
                      <Row>{serie.serie.title} </Row>
                      <Row onClick={() => this.goToItemDetail(serie.id)}>
                        <img
                          src={serie.serie.images.medium.main}
                          alt="main"
                          className="img-fluid p-2"
                        />
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
)(Series);
