import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';

import { Messages as messages, Locales as locales } from '../i18n';
import { Authenticated } from 'modules/global/components';
import { client } from '../ApolloClient';
import { routes } from 'modules';

addLocaleData(locales);
const formatsDate = {
  'full-date': {
    year: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
};
const locale = 'es'; // Detect language

const RouteWithSubRoutes = route => {
  if (route.authenticatedRequired) {
    return (
      <Authenticated {...route.props}>
        <Route
          path={route.path}
          render={props => <route.component {...props} routes={route.routes} />}
        />
      </Authenticated>
    );
  } else {
    return (
      <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }
};

export default class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <IntlProvider
          locale={locale}
          messages={messages[locale]}
          formats={{ date: formatsDate }}
        >
          <BrowserRouter>
            <Switch>
              {/* Module Routes */}
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
              {/* 404 */}
              {
                // <RouteWithSubRoutes
                //   authenticatedRequired={true}
                //   component={NotFound}
                // />
              }
            </Switch>
          </BrowserRouter>
        </IntlProvider>
      </ApolloProvider>
    );
  }
}
