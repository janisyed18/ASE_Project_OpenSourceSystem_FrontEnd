import react, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserNameWithoutSpace, isLoggedIn, removeUnderscore } from "../utils/authentication";

function App(props) {

  const [isLogIn, setisLogIn] = useState(isLoggedIn());
  const logout = () => {
    localStorage.clear();
    setisLogIn(false);
  };
  // const history = useHistory()
  if(!isLogIn) {
    console.log("not logged in");
    // props.history.push("/");
  } 
  console.log("logged in");

  const userName = removeUnderscore(getUserNameWithoutSpace());


  return (
    <>
    {isLogIn && 
        <Navbar bg="dark" variant="dark">
          <Container>
            <Link to="/" className="navbar-brand">
              Home
            </Link>

            <Nav className="me-auto">
              {/* <Link to="/signup" className="nav-link">
                Sign-up
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link> */}
              <Link to="/project/create" className="nav-link">
                Create Project
              </Link>
              <Link to="/projects" className="nav-link">
                Projects
              </Link>
              <Link to="/" onClick={logout} className="nav-link">
                Logout
              </Link>

              {/* <Link to ="/projects" className = "nav-link">Logout</Link> */}
            </Nav>
          </Container>
          <Navbar.Text>
         {userName}
      </Navbar.Text>
        </Navbar>
}
    </>
  );
}

export default App;
