import React, { PureComponent, Fragment } from 'react';
import classnames from 'classnames';

import styles from './ContainerScrollHorizontal.mod.css';

const ContainerScrollHorizontal = ({ children }) => (
  <div
    className={classnames(
      styles['scrolling-wrapper-flexbox'],
      'flex-column',
      'flex-md-row'
    )}
  >
    {children}
  </div>
);

ContainerScrollHorizontal.displayName = 'ContainerScrollHorizontal';

ContainerScrollHorizontal.propTypes = {};
export default ContainerScrollHorizontal;
