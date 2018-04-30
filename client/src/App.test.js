import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("./App");

it("renders without crashing", () => {
  const div = document.createElement("div");

  // Temporarily until cancellable fetch is widely adopted
  App.componentDidMount = jest.fn(() => true);

  ReactDOM.render(<App />, div);

  ReactDOM.unmountComponentAtNode(div);
});
