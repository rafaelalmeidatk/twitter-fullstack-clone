import React, { createContext } from 'react';

export const LoggedInContext = createContext();

export const LoggedInUserProvider = ({ loggedInUser, children }) => (
  <LoggedInContext.Provider value={loggedInUser}>
    {children}
  </LoggedInContext.Provider>
);
