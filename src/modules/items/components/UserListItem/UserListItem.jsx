import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers } from 'recompose';

import { imageShape } from 'modules/global/proptypes';
import { ContainerScrollHorizontal } from 'modules/global/components';

import styles from './UserListItem.mod.css';

const UserListItem = ({
  id,
  handleOnClickItem,
  handleOnClickItemDetail,
  list
}) => (
  <div className={styles.list} key={list.id} onClick={handleOnClickItem}>
    <div className="text-left pl-5 bg-light">{list.name}</div>

    <ContainerScrollHorizontal>
      {list.items.map(item => (
        <div className={styles.card} key={item.id}>
          <img
            src={item.images.medium.main}
            className={styles.image}
            alt="main"
            onClick={this.handleOnClickItemDetail}
          />
          <div className={styles.cardBottom}>
            <div className="text-right mr-2">{item.title}</div>
          </div>
        </div>
      ))}
    </ContainerScrollHorizontal>
  </div>
);

UserListItem.displayName = 'UserListItem';

UserListItem.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickItemDetail: PropTypes.func.isRequired,
  list: PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        images: imageShape.isRequired
      })
    )
  })
};

export default compose(
  withHandlers({
    handleOnClickItem: props => event => {
      event.stopPropagation();
      props.onClick(props.id);
    },
    handleOnClickItemDetail: props => event => {
      event.stopPropagation();
      props.onClickItemDetail(props.id, props.list.type);
    }
  })
)(UserListItem);
