import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';

import { LoginForm, RegisterForm } from 'modules/global/components';

import styles from './Init.mod.css';

export class Init extends PureComponent {
  static displayName = 'Init';

  render() {
    return (
      <div
        className={classnames(
          'd-flex',
          'justify-content-between',
          'flex-column',
          'flex-md-row',
          'align-items-stretch',
          'h-100'
        )}
      >
        <div className={classnames('w-100', 'h-100', styles.left)}>
          <div> TODO </div>
        </div>
        <div className={classnames('w-100', 'h-100', styles.right)}>
          <div className={styles.top}>
            <LoginForm />
          </div>
          <hr className={styles.separator} />
          <div className={styles.down}>
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Init);
