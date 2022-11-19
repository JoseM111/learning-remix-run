// MainNavigation.tsx
import { NavLink } from '@remix-run/react';
import type { ReactElement } from 'react';

function MainNavigation(): ReactElement {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          {/*is referencing css styles from the main.css file*/}
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes">My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
