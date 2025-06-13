import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  // Named 'App' - convention
  return <h1>Hello React!</h1>;
}

// React version 18
const root = ReactDOM.createRoot(document.getElementById("root")); // id='root' in 'public/index.html'
// what's webpack
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
