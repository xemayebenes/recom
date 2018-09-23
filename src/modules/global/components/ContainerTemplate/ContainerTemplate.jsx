import React, { PureComponent, Fragment } from 'react';

import classnames from 'classnames';
import { Container } from 'reactstrap';

import styles from './ContainerTemplate.mod.css';

export class ContainerTemplate extends PureComponent {
  render() {
    return (
      <Fragment>
        <div
          className={classnames(
            styles.header,
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          {this.props.title}
        </div>

        <Container className={classnames(styles.container)}>
          {this.props.children}
        </Container>
      </Fragment>
    );
  }
}

export default ContainerTemplate;
