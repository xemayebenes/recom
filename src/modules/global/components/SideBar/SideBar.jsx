import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from '@trendmicro/react-sidenav';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

export class SideBar extends PureComponent {
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

  onClickNavItem = route => {
    this.props.history.push(`${route}`);
  };

  render() {
    return (
      <Fragment>
        <SideNav
          className="position-fixed"
          onSelect={selected => {
            console.log(selected);
          }}
          onToggle={this.onToggle}
        >
          <Toggle className="d-none d-md-block" />
          <Nav>
            <NavItem
              eventKey="home"
              onSelect={() => this.onClickNavItem('/')}
              active={this.props.location.pathname === '/'}
            >
              <NavIcon>
                <FontAwesomeIcon icon={faHome} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem
              eventKey="movies"
              onSelect={() => this.onClickNavItem('/movies')}
              active={this.props.location.pathname.indexOf('/movie') >= 0}
            >
              <NavIcon>
                <FontAwesomeIcon icon={faFilm} />
              </NavIcon>
              <NavText>Movies</NavText>
            </NavItem>
            <NavItem
              eventKey="series"
              onSelect={() => this.onClickNavItem('/series')}
              active={this.props.location.pathname.indexOf('/serie') >= 0}
            >
              <NavIcon>
                <FontAwesomeIcon icon={faTv} />
              </NavIcon>
              <NavText>Series</NavText>
            </NavItem>
            {
              //   <NavItem eventKey="charts">
              //   <NavIcon>
              //     <i
              //       className="fa fa-fw fa-line-chart"
              //       style={{ fontSize: '1.75em' }}
              //     />
              //   </NavIcon>
              //   <NavText>Charts</NavText>
              //   <NavItem eventKey="charts/linechart">
              //     <NavText>Line Chart</NavText>
              //   </NavItem>
              //   <NavItem eventKey="charts/barchart">
              //     <NavText>Bar Chart</NavText>
              //   </NavItem>
              // </NavItem>
            }
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

export default compose(withRouter)(SideBar);
