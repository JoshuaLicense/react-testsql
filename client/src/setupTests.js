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

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.sessionStorage = sessionStorageMock;
