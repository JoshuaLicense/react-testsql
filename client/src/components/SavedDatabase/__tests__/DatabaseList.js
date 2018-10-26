import React from "react";
import { shallow } from "enzyme";

import DatabaseItem from "../DatabaseItem";

import DatabaseList from "../DatabaseList";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const loadDatabaseMock = jest.fn();
const refreshHandlerMock = jest.fn();
const closeHandlerMock = jest.fn();

describe("ActiveGroups component (Initial loading)", () => {
  // Blank objects are enough to mock the "database" info for the list
  const list = [
    { _id: "31c286f9064f4d92911419783a7b299d" },
    { _id: "41f9064f1431c28619783ad9297b299d" }
  ];

  let component;

  beforeEach(async () => {
    // Disable lifecycle methods so the script can access the load promise directly.
    component = shallow(
      <DatabaseList
        list={list}
        loadDatabaseHandler={loadDatabaseMock}
        refreshSavedDatabaseList={refreshHandlerMock}
        closeHandler={closeHandlerMock}
      />
    );

    jest.clearAllMocks();
  });

  it(`renders ${list.length} amount of database items in the list`, () => {
    expect(component.find(DatabaseItem).length).toEqual(list.length);
  });

  it("tries to load a saved database", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
      })
    );

    await component
      .instance()
      .handleLoadDatabase("31c286f9064f4d92911419783a7b299d");

    // Assert the relevant flow was followed.
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(loadDatabaseMock).toHaveBeenCalledTimes(1);
    expect(closeHandlerMock).toHaveBeenCalledTimes(1);
  });

  it("tries to delete a saved database", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => Promise.resolve("OK")
      })
    );
    //deleteDatabase.mockImplementation(() => new Promise(resolve => resolve()));

    await component
      .instance()
      .handleDeleteDatabase("31c286f9064f4d92911419783a7b299d");

    // Assert the relevant flow was followed.
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(refreshHandlerMock).toHaveBeenCalledTimes(1);
  });

  it("catches an error when trying to load a saved database", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to load this database."
          }),
        text: () =>
          Promise.resolve(
            "A problem occured while trying to load this database."
          )
      })
    );

    await component
      .instance()
      .handleLoadDatabase("31c286f9064f4d92911419783a7b299d");

    // Assert the relevant flow was followed.
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(loadDatabaseMock).toHaveBeenCalledTimes(0);
    expect(closeHandlerMock).toHaveBeenCalledTimes(0);

    expect(component.state("error")).toEqual(
      "A problem occured while trying to load this database."
    );
  });

  it("catches an error when trying to delete a saved database", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to delete this database."
          }),
        text: () =>
          Promise.resolve(
            "A problem occured while trying to delete this database."
          )
      })
    );

    await component
      .instance()
      .handleDeleteDatabase("31c286f9064f4d92911419783a7b299d");

    // Assert the relevant flow was followed.
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(refreshHandlerMock).toHaveBeenCalledTimes(0);

    expect(component.state("error")).toEqual(
      "A problem occured while trying to delete this database."
    );
  });

  it("calls the closeHandler props", async () => {
    await component.instance().handleClose();

    expect(closeHandlerMock).toHaveBeenCalledTimes(1);
  });
});

it("displays an empty placeholder when the user has no saved databases", () => {
  // Disable lifecycle methods so the script can access the load promise directly.
  const list = [];

  const component = shallow(<DatabaseList list={list} />);

  expect(
    component
      .find(ListItem)
      .findWhere(elem => elem.props().disabled === true)
      .find(ListItemText)
      .render()
      .text()
  ).toEqual("No saved databases yet!");
});
