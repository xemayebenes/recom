import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from '@trendmicro/react-sidenav';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
export default class SideBar extends PureComponent {
  static displayName = 'SideBar';

  static propTypes = {
    children: PropTypes.node.isRequired
  };
  state = {
    expanded: false
  };

  onToggle = expanded => {
    this.setState({ expanded: expanded });
  };

  render() {
    return (
      <Fragment>
        <SideNav
          onSelect={selected => {
            console.log(selected);
          }}
          onToggle={this.onToggle}
        >
          <Toggle />
          <Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <FontAwesomeIcon icon={faHome} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: '1.75em' }}
                />
              </NavIcon>
              <NavText>Charts</NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>Line Chart</NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>Bar Chart</NavText>
              </NavItem>
            </NavItem>
          </Nav>
        </SideNav>
        <div
          style={{
            marginLeft: this.state.expanded ? 240 : 64
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}
