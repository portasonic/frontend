import React, { FunctionComponent, useContext, useState } from "react";

import { ApiClient } from "../client";

type AuthState = {
  loggedIn: boolean;
  identity: {
    username: string;
    roles: string[];
  } | null;

  login: (username: string, password: string) => Promise<string>;
  getApiClient: () => ApiClient;
};

const emptyAuthState: AuthState = {
  loggedIn: false,
  identity: null,

  login: async (): Promise<string> => {
    throw "this is an empty auth state";
  },
  getApiClient: () => {
    throw "this is an empty api client";
  },
};

export const AuthContext = React.createContext<AuthState>(emptyAuthState);

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthenticationProvideProperties = {};

export const AuthenticationProvider: FunctionComponent<AuthenticationProvideProperties> =
  ({ children }) => {
    const defaultAuthState: AuthState = {
      ...emptyAuthState,

      login: async (username: string, password: string): Promise<string> => {
        throw "not yet implemented";
      },

      getApiClient: () => {
        throw "not yet implemented";
      },
    };

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    return (
      <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
    );
  };
