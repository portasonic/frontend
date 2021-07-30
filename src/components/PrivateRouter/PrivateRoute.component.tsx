import React, { FunctionComponent } from "react";
import { RouteProps } from "react-router";
import { Navigate, Route } from "react-router-dom";

import { useAuth } from "../../api/portasonic/auth";

type PrivateRouteProperties = RouteProps & {
  roles: string[];
};

const PrivateRoute: FunctionComponent<PrivateRouteProperties> = ({
  roles,
  ...props
}) => {
  const { loggedIn, identity } = useAuth();

  const ok =
    loggedIn &&
    roles
      .map((role) => identity!.roles.indexOf(role) >= 0)
      .reduce((p, c) => p && c);

  if (ok) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
