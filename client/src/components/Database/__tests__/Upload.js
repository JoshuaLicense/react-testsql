import React from "react";
import { shallow } from "enzyme";

import UploadDatabase from "../Upload";

import IconButton from "@material-ui/core/IconButton";

window.FileReader = jest.fn(() => ({
  readAsArrayBuffer: function() {
    // The onload should be registered before this function is called.
    // Call it here.
    this.onload();

    return new ArrayBuffer(10);
  }
}));

const mockUserContext = jest.fn();

jest.mock("../../Auth/Context", () => ({
  Consumer: ({ children }) => children(mockUserContext())
}));

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const uploadDatabaseHandlerMock = jest.fn();

describe("UploadDatabase component", () => {
  it("renders the UploadDatabase component", () => {
    mockUserContext.mockReturnValueOnce({ user: {}, isLoaded: true });

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    ).dive();

    expect(component.find("input").length).toEqual(1);
  });

  it("renders the UploadDatabase component as a disabled button", () => {
    mockUserContext.mockReturnValueOnce({
      user: { group: true },
      isLoaded: true
    });

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    ).dive();

    expect(component.find(IconButton).prop("disabled")).toBeTruthy();
  });

  it("uploads the selected file", async () => {
    const uploadDatabaseHandlerMock = jest.fn();

    mockUserContext.mockReturnValueOnce({
      user: { group: true },
      isLoaded: true
    });

    const component = shallow(
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandlerMock} />
    );

    const file = new File(["Mock Database"], "database.txt");

    component.instance().handleUpload({ target: { files: [file] } });

    await flushPromises();

    expect(uploadDatabaseHandlerMock).toHaveBeenCalledTimes(1);
  });
});
