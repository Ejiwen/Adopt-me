import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const ThemeHook = useState("darkblue");

  document.body.style.background = ThemeHook[0];

  return (
    <ThemeContext.Provider value={ThemeHook}>
      <div style={{ backgroundColor: ThemeHook[0] }}>
        <header>
          {" "}
          <Link to="/"> Adopt Me! </Link>{" "}
        </header>

        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
