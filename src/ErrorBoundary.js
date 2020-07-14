import React from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, info);
  }

  //---------------------------RedirectError <----------------------------------------
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  //---------------------------RedirectError >----------------------------------------
  render() {
    //---------------------------RedirectError <----------------------------------------
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    //---------------------------RedirectError <----------------------------------------

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong.. <Link to="/">HOME PAGE</Link>
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
