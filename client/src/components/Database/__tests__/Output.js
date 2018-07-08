import React from "react";

import { shallow } from "enzyme";

import DatabaseOutput from "../Output";

import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

describe("Database Output component", () => {
  it("renders a table from the props supplied", () => {
    const columns = ["Column 1", "Column 2", "Column 3"];

    const values = [
      ["Row 1 value 1", "Row 1 value 2", "Row 1 value 3"],
      ["Row 2 value 1", "Row 2 value 2", "Row 2 value 3"],
      ["Row 3 value 1", "Row 3 value 2", "Row 3 value 3"]
    ];

    const component = shallow(
      <DatabaseOutput columns={columns} values={values} />
    );

    expect(component.find(TableHead).find(TableCell).length).toEqual(
      columns.length
    );

    expect(component.find(TableBody).find(TableRow).length).toEqual(
      values.length
    );
  });
});
