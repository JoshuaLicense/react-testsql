import React from "react";
import { shallow } from "enzyme";

import FileSaver from "file-saver";
import DownloadDatabase from "../DownloadDatabase";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

describe("DownloadDatabase component", () => {
  let component, currentDatabaseMock;

  beforeEach(() => {
    currentDatabaseMock = { export: jest.fn() };

    component = shallow(
      <DownloadDatabase currentDatabase={currentDatabaseMock} />
    );
  });

  it("exports the current database", () => {
    component.instance().handleDownload();

    expect(currentDatabaseMock.export).toHaveBeenCalledTimes(1);
    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1);
  });
});
