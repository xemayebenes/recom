import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { Mutation, withApollo } from 'react-apollo';
import classnames from 'classnames';

import { compose } from 'recompose';
import {
  Label,
  Input,
  Form,
  FormGroup,
  Button,
  Container,
  ButtonGroup
} from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import { MOVIE, SERIE } from 'modules/constants';
import { ContainerScrollHorizontal } from 'modules/global/components';

import getUserMovies from 'gql/movies/getUserMovies.gql';
import getUserSeries from 'gql/series/getUserSeries.gql';
import CREATE_LIST from 'gql/lists/createList.gql';
import getLists from 'gql/lists/getLists.gql';

import styles from './ListForm.mod.css';
export class ListForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      type: undefined,
      items: null,
      itemSelected: []
    };
  }

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleChangeName = event => {
    this.handleChange('name', event);
  };

  handleChangeDescription = event => {
    this.handleChange('description', event);
  };

  handleSelectType = type => {
    this.setState({ type, items: [] });
  };

  setMovies = (type, movies) => {
    this.setState({
      type,
      items: movies.map(movie => ({ id: movie.id, ...movie.film }))
    });
  };

  setSeries = (type, series) => {
    this.setState({
      type,
      items: series.map(serie => ({ id: serie.id, ...serie.serie }))
    });
  };

  selectItem = item => {
    this.setState(({ itemSelected }) => {
      if (itemSelected.indexOf(item) >= 0) {
        return {
          itemSelected: itemSelected.filter(id => id !== item)
        };
      }

      return {
        itemSelected: [...itemSelected, item]
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  loadMovies = async () => {
    const { data } = await this.props.client.query({
      query: getUserMovies,
      variables: {
        userId: this.props.user.userId
      }
    });
    this.setMovies(MOVIE, data.getUserMovies);
  };

  loadSeries = async () => {
    const { data } = await this.props.client.query({
      query: getUserSeries,
      variables: {
        userId: this.props.user.userId
      }
    });
    this.setSeries(SERIE, data.getUserSeries);
  };

  handleOnCompleteCreate = data =>
    this.props.history.push(`/lists/${data.createList.id}`);

  render() {
    return (
      <Fragment>
        <div
          className={classnames(
            styles.header,
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          <div>NEW LISTS</div>
        </div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="mt-2">
              <Label for="name"> Name </Label>
              <Input
                type="text"
                id="name"
                value={this.state.name}
                onChange={this.handleChangeName}
                className="mb-2"
              />
              <Label for="description"> Description </Label>
              <Input
                type="textarea"
                id="description"
                value={this.state.description}
                onChange={this.handleChangeDescription}
              />

              <div>
                <Label> Type </Label>
                <div id="type">
                  <ButtonGroup>
                    <Button color="primary" onClick={this.loadMovies}>
                      <FontAwesomeIcon icon={faFilm} />
                    </Button>
                    <Button color="secondary" onClick={this.loadSeries}>
                      <FontAwesomeIcon icon={faTv} />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </FormGroup>
            {this.state.items && (
              <Fragment>
                <div className={styles.list}>
                  <ContainerScrollHorizontal>
                    {this.state.items &&
                      this.state.items.map(item => (
                        <ListFormItem
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          images={item.images}
                          selected={
                            this.state.itemSelected.indexOf(item.id) >= 0
                          }
                          onClick={this.selectItem}
                        />
                      ))}
                  </ContainerScrollHorizontal>
                </div>

                <Mutation
                  mutation={CREATE_LIST}
                  onCompleted={this.handleOnCompleteCreate}
                >
                  {(createList, { loading, error }) => (
                    <div className="float-right mt-2">
                      <CreateListButton
                        onClick={createList}
                        name={this.state.name}
                        description={this.state.description}
                        type={this.state.type}
                        itemSelected={this.state.itemSelected}
                        userId={this.props.user.userId}
                      />

                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  )}
                </Mutation>
              </Fragment>
            )}
          </Form>
        </Container>
      </Fragment>
    );
  }
}

class CreateListButton extends PureComponent {
  static displayName = 'CreateListButton';
  handleClick = async () => {
    this.props.onClick({
      variables: {
        name: this.props.name,
        description: this.props.description,
        type: this.props.type,
        items: this.props.itemSelected
      },
      refetchQueries: [
        {
          query: getLists,
          variables: {
            userId: this.props.userId
          }
        }
      ]
    });
  };
  render() {
    return (
      <Button size="sm" color="primary" onClick={this.handleClick}>
        Create
      </Button>
    );
  }
}
class ListFormItem extends PureComponent {
  static displayName = 'ListFormItem';

  handleClick = () => {
    this.props.onClick(this.props.id);
  };
  render() {
    const { selected, images, title } = this.props;
    return (
      <div
        className={classnames(styles.card, {
          [styles.shadow]: selected
        })}
        onClick={this.handleClick}
      >
        <img src={images.medium.main} alt="main" className={styles.image} />
        <div className={styles.cardBottom}>
          <div className="text-right mr-2">{title}</div>
        </div>
      </div>
    );
  }
}
export default compose(
  withRouter,
  withApollo,
  injectIntl
)(ListForm);
