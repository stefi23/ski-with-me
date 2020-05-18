import React, { useState } from "react";
import "./App.css";
import Login from "./Login.js";
import LoggedIn from "./LoggedIn";

function App() {
  const [isLoggedIn, updateLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
        {isLoggedIn ? <LoggedIn /> : <Login updateLoggedIn={updateLoggedIn} />}
      </header>
    </div>
  );
}
export default App;
