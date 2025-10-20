import { useEffect, useState } from "react";
import { deleteService, getService, putService } from "../../data/service";
import { Button, Container, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import AddService from "../components/AddService.jsx";
import { useNavigate } from "react-router-dom";

function Service() {

    const [service, setService] = useState([]);

    useEffect(() => {
        async function fetchService() {
            try {
                const data = await getService();
                setService(data);
            } catch (error) {
                console.error("Errore nel recuperare la lista dei servizi", error);
            }
        }
        fetchService();
    }, []);

    const handleDeleteService = async (id) => {
        const confirm = window.confirm("Sei sicuro di voler eliminare il servizio?");
        if (!confirm) return;
        try {
            await deleteService(id);
            setService(service.filter(service => service._id !== id));
        } catch (error) {
            console.error("Errore nell'eliminare il servizio")
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (service) => { setServiceEdit(service); setShow(true); }

    const [serviceEdit, setServiceEdit] = useState({
        name: "",
        duration: "",
        price: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceEdit((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const updated = await putService(serviceEdit._id, serviceEdit);
            setService((prev) =>
                prev.map((c) => (c._id === updated._id ? updated : c))
            );
            handleClose();
        } catch (error) {
            console.error("Errore nella modifica del servizio", error);
        }
    };

    const navigate = useNavigate();

    
    return (
        <Container className="vh-100">
        <div className="d-flex justify-content-between mb-3">
        <h2>Servizi</h2>
        <Button onClick={() => navigate("/service/addService")}>
          + Nuovo Servizio
        </Button>
      </div>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Nome</th>
                            <th>Durata</th>
                            <th>Prezzo</th>
                            <th>Modifica</th>
                            <th>Elimina</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {service.map(service => (
                            <tr key={service._id}>
                                <td>{service.name}</td>
                                <td>{service.duration}</td>
                                <td>{service.price}€</td>
                                <td>
                                    <i className="bi bi-pencil-square"
                                        role="button"
                                        onClick={() => handleShow(service)}
                                    >
                                    </i>
                                </td>
                                <td>  <i
                                    className="bi bi-x-square-fill text-danger "
                                    role="button"
                                    onClick={() => handleDeleteService(service._id)}
                                ></i>
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={serviceEdit.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Durata</Form.Label>
                        <Form.Control
                            type="text"
                            name="duration"
                            value={serviceEdit.duration}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Prezzo</Form.Label>
                        <InputGroup>

                            <Form.Control
                                type="number"
                                name="price"
                                value={serviceEdit.price}
                                onChange={handleChange}
                                required
                            />
                            <InputGroup.Text>€</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salva Modifiche
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default Service;
