import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NewAppointment from './NewAppointment.jsx';
import NewClient from './NewClient.jsx';

function NavBar({ isAuth, setIsAuth }) {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/");
  }

  const [showAppointment, setShowAppointment] = useState(false);
  const [showClient, setShowClient] = useState(false);

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">EasyPlanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Calendario</Nav.Link>
            <Nav.Link href="/service">Servizi</Nav.Link>
            <Nav.Link href="/client">Clienti</Nav.Link>
          </Nav>

          <Form className="d-flex align-items-center">
            <Row className="g-2 align-items-center">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2"
                />
              </Col>
              <Col xs="auto">
                <NavDropdown className='button' title="+" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => setShowClient(true)}>
                    Nuovo Cliente
                    </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShowAppointment(true)}>
                    Nuovo Appuntamento
                  </NavDropdown.Item>
                </NavDropdown>
                <NewClient
                show={showClient}
                handleClose={() => setShowClient(false)}
                />
                <NewAppointment
                  show={showAppointment}
                  onClose={() => setShowAppointment(false)}
                />
                
              </Col>

            </Row>
          </Form>
          {isAuth ? (
            <Button className="ms-2" variant="danger" onClick={handleLogout}>
              Disconnetti
            </Button>
          ) : (
            <Link className="btn btn-primary ms-2" to="/login">Accedi</Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar;