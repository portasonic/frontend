import './App.css';
import {AuthenticationProvider} from "./auth";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import {Login} from "./pages/Login";

function App() {

  console.log("hello world")

  return (
      <AuthenticationProvider>
          <BrowserRouter>
              <Routes>
                  <Route path={"/login"}>
                      <Login />
                  </Route>
                  <PrivateRoute path={"/"} roles={["user"]}>
                      <h1>Private</h1>
                  </PrivateRoute>
                  <Route path={"/*"}>
                      <h1>Test</h1>
                  </Route>
              </Routes>
          </BrowserRouter>
      </AuthenticationProvider>
  );
}

export default App;
