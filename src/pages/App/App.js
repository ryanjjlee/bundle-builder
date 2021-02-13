import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import "./App.css";

import LoginPage from "../LoginPage/LoginPage";
import LogoutPage from "../LogoutPage/LogoutPage";
import SignupPage from "../SignupPage/SignupPage";

import userService from "../../utils/userService";

import NavBar from "../../components/NavBar/NavBar";
import AddProductPage from "../AddProductPage/AddProductPage";
import ProductIndexPage from "../ProductIndexPage/ProductIndexPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...this.getInitialState(),
      user: userService.getUser(),
    };
  }

  getInitialState() {
    return {};
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleDeleteProduct = async (id) => {
    await productAPI.deleteOne(id);
    this.setState(
      (state) => ({
        products: state.products.filter((p) => p._id !== id),
      }),
      () => this.props.history.push("/")
    );
  };

  render() {
    return (
      <div className="App">
        <Switch></Switch>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Route
          exact
          path="/products"
          render={() => (
            <ProductIndexPage
              handleDeleteProduct={this.handleDeleteProduct}
              products={this.state.products}
            />
          )}
        />
        <Route exact path="/products/new" render={() => <AddProductPage />} />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route exact path="/logout" render={({ history }) => <LogoutPage />} />
      </div>
    );
  }
}

export default App;
