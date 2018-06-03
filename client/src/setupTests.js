import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.document.createRange = () => {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {}
  };
};

const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(() => null),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

const sessionStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(() => null),
  clear: jest.fn()
};

global.sessionStorage = sessionStorageMock;
