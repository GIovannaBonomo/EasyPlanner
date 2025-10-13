import { useState } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import { createService } from "../../data/service.js";
import { useNavigate } from "react-router-dom";

function AddService() {
  const [service, setService] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createService(service);
      if (created) {
        alert("Servizio creato con successo!");
        navigate("/service");
        setService({ name: "", duration: "", price: "" });
      }
    } catch (error) {
      console.error("Errore nella creazione del servizio", error);
      alert("Errore nel creare il servizio");
    }
  };

  return (
    <Container>
      <Modal.Dialog>
        <Modal.Header className="m-3">
          <Modal.Title>Aggiungi Servizio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Durata</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={service.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prezzo (€)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={service.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button className="m-3" variant="secondary" onClick={() => navigate("/service")}>
                Chiudi
              </Button>
              <Button variant="primary" type="submit">
                Salva
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Container>
  );
}

export default AddService;