import React, {FunctionComponent} from "react";
import {Navigate, Route} from "react-router-dom";
import {RouteProps} from "react-router";
import {useAuth} from "./index";

type PrivateRouteProperties = RouteProps & {
    roles: string[]
}

const PrivateRoute: FunctionComponent<PrivateRouteProperties> = ({roles, ...props}) => {
    const {loggedIn, identity} = useAuth()

    const ok = loggedIn && roles
        .map(role => identity!.roles.indexOf(role) >= 0)
        .reduce((p, c) => p && c)

    if (ok)
        return <Route {...props} />
    else
        return <Navigate to="/login" />
}

export default PrivateRoute