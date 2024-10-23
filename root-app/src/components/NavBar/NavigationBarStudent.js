import React, { useState, useCallback, useMemo } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import './NavigationBar.css';
import { Link } from 'react-router-dom';

function NavigationBarStudent() {
  let pathName = useMemo(
    () => window.location.pathname,
    [window.location.pathname],
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div className="navBar1">
      <Navbar
        dark
        className="fixed-top d-flex justify-content-between"
        expand="md"
      >
        <NavItem>
          <Link to="/Students/Home" className="text-white">
            XData
          </Link>
        </NavItem>
        <NavbarToggler onClick={toggle} style={{ width: 'auto' }} />
        <Collapse
          isOpen={isOpen}
          navbar
          style={{
            color: 'white',
            width: 'auto',
          }}
        >
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/Students/Problems" onClick={toggle}> 
                <p
                  className={`m-2 ${
                    !!!pathName.split('/')[1] ? 'text-white' : 'text-secondary '
                  }`}
                >
                  {' '}
                  Problems
                </p>
               </Link> 
            </NavItem>
            <NavItem>
            <Link to="/Students/Contests" onClick={toggle}>
                <p
                  className={` m-2 ${
                    pathName.split('/')[1] === 'MostCommentPost'
                      ? 'text-white'
                      : 'text-secondary'
                  }`}
                >
                  {' '}
                  Contests
                </p>
              </Link> 
            </NavItem>

            <NavItem>
              <Link to="/Students/IDE" onClick={toggle}>
                <p
                  className={`m-2 ${
                    pathName.split('/')[1] === 'MostLikedPost'
                      ? 'text-white'
                      : 'text-secondary'
                  }`}
                >
                  {' '}
                  IDE
                </p>
              </Link> 
            </NavItem>
            <NavItem>
            <Link to="/Students/Profile" onClick={toggle}>
                <p
                  className={` m-2 ${
                    pathName.split('/')[1] === 'MostCommentPost'
                      ? 'text-white'
                      : 'text-secondary'
                  }`}
                >
                  {' '}
                  Profile
                </p>
              </Link> 
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBarStudent;
