import { shallow, mount, render } from "enzyme";
import React from "react";
import Header from "./index";

import Context from "../Auth/Context";

jest.mock("../Auth/Context");

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />).dive();

    console.log(wrapper.debug());

    const authComponent = wrapper.find(Context.Consumer).shallow();

    console.log(authComponent.debug());
  });

  it("shows the logged in actions", () => {});
});
