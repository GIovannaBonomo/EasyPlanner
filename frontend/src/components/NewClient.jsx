import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { createClient } from "../../data/client";

function NewClient({ show, handleClose, onCreate }) {

  const [client, setClient] = useState({
    name: "",
    email: "",
    number: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSumbit = async () => {
    try {
      await createClient(client);
      onCreate();
      handleClose();
      setClient({ name: "", email: "", number: "" })
    } catch (error) {
      console.log("errore nella creazione del cliente", error)
    }
  }

  return (
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
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleSumbit}>
          Fatto
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default NewClient;