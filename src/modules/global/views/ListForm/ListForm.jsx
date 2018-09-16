import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { ApolloConsumer, Mutation } from 'react-apollo';
import classnames from 'classnames';

import { compose } from 'recompose';
import {
  Label,
  Input,
  Form,
  FormGroup,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup
} from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import { MOVIE, SERIE } from 'modules/constants';

import getUserMovies from 'gql/movies/getUserMovies.gql';
import getUserSeries from 'gql/series/getUserSeries.gql';
import CREATE_LIST from 'gql/lists/createList.gql';
import getLists from 'gql/lists/getLists.gql';

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
    this.setState({ type });
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

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs="12" md="4">
              <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                  type="text"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label for="description"> Description </Label>
                <Input
                  type="textarea"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChangeDescription}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <ApolloConsumer>
                {client => (
                  <div>
                    <FormGroup>
                      <Label> Type </Label>
                      <div id="type">
                        <ButtonGroup>
                          <Button
                            color="secondary"
                            onClick={async () => {
                              const { data } = await client.query({
                                query: getUserMovies,
                                variables: {
                                  userId: this.props.user.userId
                                }
                              });
                              this.setMovies(MOVIE, data.getUserMovies);
                            }}
                          >
                            <FontAwesomeIcon icon={faFilm} />
                          </Button>
                          <Button
                            color="secondary"
                            onClick={async () => {
                              const { data } = await client.query({
                                query: getUserSeries,
                                variables: {
                                  userId: this.props.user.userId
                                }
                              });
                              this.setSeries(SERIE, data.getUserSeries);
                            }}
                          >
                            <FontAwesomeIcon icon={faTv} />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </FormGroup>
                  </div>
                )}
              </ApolloConsumer>
            </Col>
          </Row>
          <Row className="flex-wrap flex-row justify-content-between d-flex">
            {this.state.items &&
              this.state.items.map(item => (
                <div
                  key={item.id}
                  className={classnames(
                    'm-2 d-flex flex-column d-flex align-items-center ',
                    {
                      shadow: this.state.itemSelected.indexOf(item.id) >= 0
                    }
                  )}
                  onClick={() => this.selectItem(item.id)}
                >
                  <img
                    src={item.images.small.main}
                    alt="main"
                    className="img-fluid p-2"
                  />
                </div>
              ))}
          </Row>
          <Row>
            <Col xs={{ size: 2, offset: 10 }} md={{ size: 1, offset: 11 }}>
              <Mutation
                mutation={CREATE_LIST}
                onCompleted={data =>
                  this.props.history.push(`/lists/${data.createList.id}`)
                }
              >
                {(createList, { loading, error }) => (
                  <Fragment>
                    <Button
                      size="sm"
                      color="primary"
                      onClick={async () => {
                        createList({
                          variables: {
                            name: this.state.name,
                            description: this.state.description,
                            type: this.state.type,
                            items: this.state.itemSelected
                          },
                          update: (proxy, { data }) => {
                            const cache = proxy.readQuery({
                              query: getLists,
                              variables: {
                                userId: this.props.user.userId
                              }
                            });
                            proxy.writeQuery({
                              query: getLists,
                              variables: {
                                userId: this.props.user.userId
                              },
                              data: {
                                lists: [...cache.lists, data.createList]
                              }
                            });
                          }
                        });
                      }}
                    >
                      Create
                    </Button>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                  </Fragment>
                )}
              </Mutation>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
export default compose(
  withRouter,
  injectIntl
)(ListForm);
