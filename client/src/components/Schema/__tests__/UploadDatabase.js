import React from "react";
import { shallow } from "enzyme";

import UploadDatabase from "../UploadDatabase";

import IconButton from "@material-ui/core/IconButton";

const mockUserContext = jest.fn();

jest.mock("../../Auth/Context", () => ({
  Consumer: ({ children }) => children(mockUserContext())
}));

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("UploadDatabase component", () => {
  it("renders he UploadDatabase component", () => {
    const uploadDatabaseHandlerMock = jest.fn();

    mockUserContext.mockReturnValueOnce({ user: {} });

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    ).dive();

    expect(component.find("input#uploadFile").length).toEqual(1);
  });

  it("renders he UploadDatabase component as a disabled button", () => {
    const uploadDatabaseHandlerMock = jest.fn();

    mockUserContext.mockReturnValueOnce({ user: { group: true } });

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    ).dive();

    expect(component.find(IconButton).prop("disabled")).toBeTruthy();
  });

  it("uploads the selected file", async () => {
    const uploadDatabaseHandlerMock = jest.fn();

    mockUserContext.mockReturnValueOnce({ user: { group: true } });

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    );

    const file = new File(["Mock Database"], "database.txt");

    component.instance().handleUpload({ target: { files: [file] } });

    await flushPromises();

    expect(uploadDatabaseHandlerMock).toHaveBeenCalledTimes(1);
  });
});
