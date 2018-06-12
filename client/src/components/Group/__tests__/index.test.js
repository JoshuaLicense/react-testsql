import React from "react";
import { shallow } from "enzyme";
import GroupManager from "../index";

import IconButton from "@material-ui/core/IconButton";

it("renders without crashing", () => {
  const groupManager = shallow(<GroupManager />);

  expect(groupManager.find(IconButton).prop("color")).toEqual("inherit");
});
