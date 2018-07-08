import React from "react";

import { shallow } from "enzyme";

import Provider from "../Provider";

const user = {
  username: "Test User"
};

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("the UserContext Provider component", () => {
  it("fetches the current user on mount", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(user)
      })
    );

    const component = shallow(<Provider />);

    await flushPromises();

    // isLoaded should now be true!
    expect(component.state("isLoaded")).toBeTruthy();
    // and the user loaded
    expect(component.state("user")).toEqual(user);
  });

  it("errors while fetching the current user", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve()
      })
    );

    const component = shallow(<Provider />);

    await flushPromises();

    // isLoaded should now be true!
    expect(component.state("isLoaded")).toBeTruthy();
    // and the user loaded
    expect(component.state("user")).toBeNull();
  });
});
