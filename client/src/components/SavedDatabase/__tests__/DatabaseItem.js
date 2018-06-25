import React from "react";
import { shallow } from "enzyme";

import DeleteIcon from "@material-ui/icons/Delete";

import DatabaseItem from "../DatabaseItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

describe("DatabaseItem component", () => {
  let component, clickHandlerMock, deleteHandlerMock;

  beforeEach(() => {
    jest.resetAllMocks();

    clickHandlerMock = jest.fn();
    deleteHandlerMock = jest.fn();

    const database = {
      id: "5b11836cbc21661f106cdc93",
      createdAt: "2018-06-01T17:33:32.872Z",
      title: "Test Database 1"
    };

    component = shallow(
      <DatabaseItem
        database={database}
        clickHandler={clickHandlerMock}
        deleteHandler={deleteHandlerMock}
      />
    );
  });

  it("load a database on click", () => {
    component.simulate("click");

    expect(clickHandlerMock).toHaveBeenCalledTimes(1);
  });

  it("deletes a saved database", () => {
    // Find the leave group icon.
    const deleteIconComponent = component.find(DeleteIcon);

    // Expect there to be one as isCurrent: true
    expect(deleteIconComponent.length).toEqual(1);

    // Simulate a click of the icon.
    deleteIconComponent.closest(ListItemSecondaryAction).simulate("click");

    // Should call the relevant prop.
    expect(deleteHandlerMock).toHaveBeenCalledTimes(1);
  });
});

it("shows the delete icon if a deleteHandler is passed", () => {
  const database = {
    id: "5b11836cbc21661f106cdc93",
    createdAt: "2018-06-01T17:33:32.872Z",
    title: "Test Database 1"
  };

  const component = shallow(<DatabaseItem database={database} />);

  // Find the leave group icon.
  const deleteIconComponent = component.find(DeleteIcon);

  // Expect there to be one as isCurrent: true
  expect(deleteIconComponent.length).toEqual(0);
});
