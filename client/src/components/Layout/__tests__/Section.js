import React from "react";

import { shallow } from "enzyme";

import Section from "../Section";

describe("the Section component", () => {
  it("renders a Section around the children it is passed", () => {
    const MockComponent = () => <div>Test</div>;

    const component = shallow(
      <Section>
        <MockComponent />
      </Section>
    );

    expect(component.find(MockComponent).length).toEqual(1);
  });
});
