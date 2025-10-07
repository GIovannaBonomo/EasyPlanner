import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createClient } from '../../data/client.js';

function NavBar({ isAuth, setIsAuth }) {

  const [client, setClient] = useState({
    name: "",
    email: "",
    number: ""
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/");
  }

  const handleChange = (e) => {
  const { name, value } = e.target;
  setClient((prev) => ({ ...prev, [name]: value }));
};

const handleSumbit = async () => {
  try{
    await createClient(client);
    handleClose();
    setClient({name: "", email: "", number:""})
  }catch(error){
    console.log("errore nella creazione del cliente", error)
  }
}

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">EasyPlanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Calendario</Nav.Link>
            <Nav.Link href="#">Servizi</Nav.Link>
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
                <Button variant="primary" onClick={handleShow}> + </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Nuovo Cliente</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome e Cognome</Form.Label>
                        <Form.Control
                          type="text"
                        name="name"
                        value={client.name}
                        onChange={handleChange}
                        required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={client.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Numero di telefono</Form.Label>
                        <Form.Control
                          type="number"
                        name="number"
                        value={client.number}
                        onChange={handleChange}
                        required
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSumbit}>
                      Fatto
                    </Button>
                  </Modal.Footer>
                </Modal>

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