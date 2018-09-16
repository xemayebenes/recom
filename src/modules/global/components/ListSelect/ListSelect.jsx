import React, { Fragment } from 'react';

import { Query } from 'react-apollo';

import { Label, Input } from 'reactstrap';

import getLists from 'gql/getLists.gql';

const ListSelect = ({ userId, onSelectItem, type }) => (
  <Query variables={{ userId: userId, type }} query={getLists}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <Fragment>
          <Label for="exampleSelect">Add to list: </Label>
          <Input type="select" name="list" id="list" onChange={onSelectItem}>
            <option />
            {data.lists.map(list => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </Input>
        </Fragment>
      );
    }}
  </Query>
);

ListSelect.displayName = 'ListSelect';

ListSelect.propTypes = {};
export default ListSelect;
