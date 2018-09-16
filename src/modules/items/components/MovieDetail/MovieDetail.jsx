import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import getUserMovie from 'gql/getUserMovie.gql';
import removeMovie from 'gql/removeMovie.gql';
import completeMovie from 'gql/completeMovie.gql';
import getUserLastItems from 'gql/getUserLastItems.gql';

import { MovieData, ActionsPanel } from 'modules/items/components';
import { SendNotificationModal } from 'modules/notifications';

export class MovieDetail extends PureComponent {
  static displayName = 'MovieDetail';

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
      mutation: removeMovie,
      variables: { id },
      update: (cache, { data: { removeMovie } }) => {
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
      mutation: completeMovie,
      variables: { id },
      update: (cache, { data: { completeMovie } }) => {
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
  openShareModal = ({ externalId, film: { title } }) => {
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
          query={getUserMovie}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            const film = data.getUserMovie.film;

            return (
              <Fragment>
                <ActionsPanel
                  onClickDeleteButton={() =>
                    this.handleDeleteItem(data.getUserMovie.id)
                  }
                  onClickCompleteButton={() =>
                    this.handleCompleteMovie(data.getUserMovie.id)
                  }
                  onClickShare={() => this.openShareModal(data.getUserMovie)}
                  completed={data.getUserMovie.completed}
                />
                <MovieData {...film} completed={data.getUserMovie.completed} />
              </Fragment>
            );
          }}
        </Query>
        {showModal && (
          <SendNotificationModal
            externalId={externalId}
            type={'Movie'}
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
)(MovieDetail);
