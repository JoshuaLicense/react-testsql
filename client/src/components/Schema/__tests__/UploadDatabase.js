import React from "react";
import { shallow } from "enzyme";

import UploadDatabase from "../UploadDatabase";

import UserContext from "../../Auth/Context";
import IconButton from "@material-ui/core/IconButton";

jest.mock("../../Auth/Context");

describe("UploadDatabase component", () => {
  beforeEach(() => {
    // Different mocking of the consumer object so reset the modules
    jest.resetModules();
  });

  fit("renders he UploadDatabase component", () => {
    const uploadDatabaseHandlerMock = jest.fn();

    console.log(shallow(<UploadDatabase />).debug());

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    ).dive();

    console.log(component.debug());

    //expect(component.find("input#uploadFile").length).toEqual(1);
  });

  it("renders he UploadDatabase component as a disabled button", () => {
    jest.mock("../../Auth/Context", () => ({
      Consumer: props => props.children({ user: { group: {} } })
    }));

    const uploadDatabaseHandlerMock = jest.fn();

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    ).dive();

    expect(component.find(IconButton).props("disabled")).toBeTruthy();
  });
});
