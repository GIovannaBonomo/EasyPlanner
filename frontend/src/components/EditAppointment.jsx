import { useEffect, useState } from "react";
import { getClient } from "../../data/client";
import { deleteAppointment, putAppointment } from "../../data/appointments";
import { Button, Form, Modal } from "react-bootstrap";
import { getService } from "../../data/service";

function EditAppointment({ show, onClose, selectAppointment, onUpdated }) {

  const [client, setClient] = useState([]);
  const [service, setService] = useState([]);
  const [appointment, setAppointment] = useState({
    client: "",
    service: "",
    date: "",
    start: "",
    end: "",
    notes: "",
  });

  useEffect(() => {
    if (selectAppointment) {
      const startDate = new Date(selectAppointment.start);
      const endDate = new Date(selectAppointment.end);

      const validStart = startDate instanceof Date && !isNaN(startDate);
      const validEnd = endDate instanceof Date && !isNaN(endDate);

      setAppointment({
        client: selectAppointment.client?._id || selectAppointment.client || "",
        service: selectAppointment.service?._id || selectAppointment.service || "",
        date: validStart ? startDate.toISOString().split("T")[0] : "",
        start: validStart ? startDate.toTimeString().slice(0, 5) : "",
        end: validEnd ? endDate.toTimeString().slice(0, 5) : "",
        notes: selectAppointment.notes || "",
        id: selectAppointment.id || selectAppointment._id || "",
      });
    }
  }, [selectAppointment]);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const [clientData, serviceData] = await Promise.all([getClient(), getService()]);
        setClient(Array.isArray(clientData) ? clientData : []);
        setService(Array.isArray(serviceData) ? serviceData : []);
      } catch (error) {
        console.error("Errore nel recuperare clienti e servizi", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const start = new Date(`${appointment.date}T${appointment.start}`);
      const end = new Date(`${appointment.date}T${appointment.end}`);

      const appointmentData = {
        client: appointment.client,
        service: appointment.service,
        start: start.toISOString(),
        end: end.toISOString(),
        notes: appointment.notes,
      };

      if (!appointment.id) {
        alert("Errore: ID appuntamento mancante");
        return;
      }

      await putAppointment(appointment.id, appointmentData);
      alert("Appuntamento modificato con successo!");
      onClose();
      onUpdated();
    } catch (error) {
      console.error("Errore nella modifica dell'appuntamento", error);
      alert("Errore nella modifica dell'appuntamento");
    }
  };

  const handleDelete = async () => {
    try {
      if (!appointment.id) {
        alert("Errore: ID appuntamento mancante");
        return;
      }

      await deleteAppointment(appointment.id);
      alert("Appuntamento eliminato con successo!");
      onClose();
      onUpdated();
    } catch (error) {
      console.error("Errore nell'eliminazione dell'appuntamento", error);
      alert("Errore nell'eliminazione dell'appuntamento");
    }
  };

  return (
    <Modal show={show}>
        <Modal.Title>Modifica Appuntamento</Modal.Title>
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
              {client.map((c) => (
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
              {service.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.duration} min) - €{s.price}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={appointment.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Inizio</Form.Label>
            <Form.Control
              type="time"
              name="start"
              value={appointment.start}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fine</Form.Label>
            <Form.Control
              type="time"
              name="end"
              value={appointment.end}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
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

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Chiudi
          </Button>
          <Button type="submit" variant="primary">
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditAppointment;
