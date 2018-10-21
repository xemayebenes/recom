import React, { PureComponent, Fragment } from 'react';

import classnames from 'classnames';
import { ContainerScrollHorizontal } from 'modules/global/components';
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
        <div className={classnames(styles.container)}>
          <ContainerScrollHorizontal>
            {this.props.children}
          </ContainerScrollHorizontal>
        </div>
      </Fragment>
    );
  }
}

export default ContainerTemplate;
