import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createAppointment } from "../../data/appointments";
import { getClient } from "../../data/client";
import { getService } from "../../data/service";

function NewAppointment({ show, onClose, preselectedTime, onCreated }) {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  const [appointment, setAppointment] = useState({
    client: "",
    service: "",
    date:"",
    start: "",
    end: "",
    notes: "",
  });

  useEffect(() => {
  if (preselectedTime) {
    setAppointment((prev) => ({
      ...prev,
      date: preselectedTime.date || prev.date,
      start: preselectedTime.startTime
        ? preselectedTime.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : prev.start,
      end: preselectedTime.endTime
        ? preselectedTime.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : prev.end,
    }));
  }
}, [preselectedTime]);


  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getClient();
        setClients(Array.isArray( data) ? data : []);
      } catch (error) {
        console.error("Errore nel recupero clienti", error);
      }
    }
    fetchClients();
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getService();
        setServices(Array.isArray ( data) ? data : []);
      } catch (error) {
        console.error("Errore nel recupero servizi", error);
      }
    }
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedService = services.find((s) => s._id === appointment.service);
    if (!selectedService) {
        alert("Seleziona un servizio valido");
        return;
      }
    try {
      const start = new Date((appointment.date) + 'T' + (appointment.start));
      const end = new Date((appointment.date) + 'T' + (appointment.end));

       const appointmentData = {
        client: appointment.client,
        service: appointment.service,
        start : start.toISOString(),
        end: end.toISOString(),
        notes: appointment.notes,
      }; 
      
      await createAppointment(appointmentData);
      if (onCreated){
        onCreated(createAppointment);
      }
      alert("Appuntamento creato con successo!");
      onClose();
      setAppointment({ client: "", service: "", date:"", start: "",end:"", notes: "" });
      
      } catch (error) {
      console.error("Errore nella creazione dell'appuntamento", error);
      alert("Errore nella creazione dell'appuntamento");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuovo Appuntamento</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="clientInput">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="client"
              value={appointment.client}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un cliente</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="serviceInput">
            <Form.Label>Servizio</Form.Label>
            <Form.Select
              name="service"
              value={appointment.service}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un servizio</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.duration} min) - €{s.price}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="startInput">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={appointment.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="startInput">
            <Form.Label>Inizio</Form.Label>
            <Form.Control
              type="time"
              name="start"
              value={appointment.start}
              onChange={handleChange}
              required
            />
          </Form.Group>

           <Form.Group className="mb-3" controlId="startInput">
            <Form.Label>Fine</Form.Label>
            <Form.Control
              type="time"
              name="end"
              value={appointment.end}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="notesInput">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={appointment.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Chiudi
          </Button>
          <Button type="submit" variant="primary">
            Salva Appuntamento
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NewAppointment;
