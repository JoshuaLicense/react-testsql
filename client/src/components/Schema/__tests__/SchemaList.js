import React from "react";
import { shallow } from "enzyme";

import SchemaList from "../SchemaList";
import SchemaItem from "../SchemaItem";

const schemaList = [
  {
    name: "Table 1",
    count: 10
  },
  {
    name: "Table 2",
    count: 15
  }
];

describe("SchemaList component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <SchemaList
        schema={schemaList}
        classes={{}}
        showSchemaHandler={jest.fn()}
      />
    );
  });

  it("display a list of supplied schema tables", () => {
    expect(component.find(SchemaItem).length).toEqual(schemaList.length);
  });
});
