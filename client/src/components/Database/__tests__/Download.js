import React from "react";
import { shallow } from "enzyme";

import FileSaver from "file-saver";
import DownloadDatabase from "../Download";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

const currentDatabaseMock = { export: jest.fn() };

describe("DownloadDatabase component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <DownloadDatabase currentDatabase={currentDatabaseMock} />
    );

    jest.clearAllMocks();
  });

  it("exports the current database", () => {
    component.instance().handleDownload();

    expect(currentDatabaseMock.export).toHaveBeenCalledTimes(1);
    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1);
  });
});
