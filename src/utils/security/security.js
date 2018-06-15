import decode from 'jwt-decode';
const baseApiUrl = process.env.REACT_APP_BASE_API_URL || '';

export const STORAGE_TOKEN_KEY = 'token';

export const setToken = idToken => {
  localStorage.setItem(STORAGE_TOKEN_KEY, idToken);
};

export const getToken = () => {
  return localStorage.getItem(STORAGE_TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
};

export const getTokenExpirationDate = encodedToken => {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
};

export const isTokenExpired = token => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};

export const login = params => {
  return fetch(`${baseApiUrl}/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(response => {
      setToken(response.jwt);
      return Promise.resolve();
    });
};

export const refreshToken = url => {
  // return fetchGET(url)
  //     .then(res => {
  //         setToken(res.token);
  //         return Promise.resolve(res);
  //     })
  //     .catch(() => {
  //         removeToken();
  //         removeBestPriceData();
  //     });
};

export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

export const logout = () => {
  removeToken();
};

export const getAuthHeader = headers => {
  const token = getToken();
  return loggedIn()
    ? {
        ...headers,
        authorization: `Bearer ${token}`
      }
    : headers;
};

export const getUserId = () => {
  const encodedToken = getToken();

  if (encodedToken) {
    const token = decode(encodedToken);
    return token.userId || null;
  } else {
    return null;
  }
};
