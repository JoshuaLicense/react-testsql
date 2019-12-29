import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

window.fetch = jest.fn();

configure({ adapter: new Adapter() });

global.document.createRange = () => {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {}
  };
};

const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.sessionStorage = sessionStorageMock;
