import React, { Fragment } from 'react';
import classnames from 'classnames';
import styles from './Loader.mod.css';

const Loader = () => (
  <Fragment>
    <div className={styles['sk-folding-cube']}>
      <div className={classnames(styles['sk-cube1'], styles['sk-cube'])} />
      <div className={classnames(styles['sk-cube2'], styles['sk-cube'])} />
      <div className={classnames(styles['sk-cube4'], styles['sk-cube'])} />
      <div className={classnames(styles['sk-cube3'], styles['sk-cube'])} />
    </div>
  </Fragment>
);

Loader.displayName = 'Loader';

Loader.propTypes = {};
export default Loader;
