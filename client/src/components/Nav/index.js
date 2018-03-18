import * as React from 'react';

import UserIcon from '../Icons/User';
import ImportIcon from '../Icons/Import';

class Nav extends React.Component {
  render() {
    return (
      <nav className="d-flex flex-column bg-light border-right">
        <button className="btn btn-light rounded-0 border-bottom">
          <UserIcon />
        </button>
        <button className="btn btn-light rounded-0 border-bottom">
          <ImportIcon />
        </button>
      </nav>
    );
  }
}

export default Nav;