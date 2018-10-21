import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { SerieData } from 'modules/items/components';
import { SendNotificationModal } from 'modules/notifications';

import getUserSerie from 'gql/series/getUserSerie.gql';
import removeSerie from 'gql/series/removeSerie.gql';
import completeSerie from 'gql/series/completeSerie.gql';
import getUserLastItems from 'gql/lastItems/getUserLastItems.gql';

export class SerieDetail extends PureComponent {
  static displayName = 'SerieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      externalId: undefined,
      title: undefined,
      showModal: false
    };
  }

  handleDeleteItem = async id => {
    await this.props.client.mutate({
      mutation: removeSerie,
      variables: { id },
      update: (cache, { data: { removeSerie } }) => {
        const data = cache.readQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          }
        });
        cache.writeQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          },
          data: {
            getUserLastItems: data.getUserLastItems.filter(
              li => li.item.id !== id
            )
          }
        });
      }
    });

    this.props.history.push('/');
  };

  handleCompleteMovie = async id => {
    await this.props.client.mutate({
      mutation: completeSerie,
      variables: { id },
      update: (cache, { data: { completeSerie } }) => {
        const data = cache.readQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          }
        });
        cache.writeQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          },
          data: {
            getUserLastItems: data.getUserLastItems.filter(
              li => li.item.id !== id
            )
          }
        });
      }
    });
  };

  openShareModal = (externalId, title) => {
    this.setState({ showModal: true, externalId, title });
  };

  handleCloseModal = _ => {
    this.setState({
      showModal: false,
      externalId: undefined,
      title: undefined
    });
  };

  render() {
    const { showModal, externalId, title } = this.state;

    return (
      <Fragment>
        <Query
          variables={{ id: this.props.id, userId: this.props.userId }}
          query={getUserSerie}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const serie = data.getUserSerie.serie;

            return (
              <React.Fragment>
                <SerieData
                  {...serie}
                  id={data.getUserSerie.id}
                  externalId={data.getUserSerie.externalId}
                  completed={data.getUserSerie.completed}
                  onClickDeleteButton={this.handleDeleteItem}
                  onClickCompleteButton={this.handleCompleteMovie}
                  onClickShare={this.openShareModal}
                />
              </React.Fragment>
            );
          }}
        </Query>
        {showModal && (
          <SendNotificationModal
            externalId={externalId}
            type={'Serie'}
            title={title}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(SerieDetail);
