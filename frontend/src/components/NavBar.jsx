import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Link, useNavigate } from 'react-router-dom';

function NavBar({isAuth, setIsAuth}) {

  const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/");
  }

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="#home">EasyPlanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Calendario</Nav.Link>
            <Nav.Link href="#link">Servizi</Nav.Link>
            <Nav.Link href="#link">Clienti</Nav.Link>
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
                <Button type="submit" variant="primary">
                  Submit
                </Button>
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