import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow-sm"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold me-4"
          style={{ letterSpacing: "0.06rem", fontSize: "1.2rem" }}
        >
          Isaiah's Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-link px-3 rounded-pill"
              style={({ isActive }) => ({
                color: isActive ? "#fff" : "#d1d5db",
                backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent"
              })}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/products"
              className="nav-link px-3 rounded-pill"
              style={({ isActive }) => ({
                color: isActive ? "#fff" : "#d1d5db",
                backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent"
              })}
            >
              Products
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/addproducts"
              className="nav-link px-3 rounded-pill"
              style={({ isActive }) => ({
                color: isActive ? "#fff" : "#d1d5db",
                backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent"
              })}
            >
              + Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;