import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { deleteClient, getClient, putClient } from "../../data/client";
import NewClient from "../components/NewClient";

function Client() {

    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);

        async function fetchClients() {
            try {
                const data = await getClient();
                setClient(data);
                setLoading(false);
            } catch (error) {
                console.error("Errore nel recuperare la lista dei clienti:", error);
            }
        }
    useEffect(() => {
        fetchClients();
    }, []);

    const handleDeleteClient = async (id) => {
        const confirm = window.confirm("Sei sicuro di voler eliminare questo cliente?");
        if (!confirm) return;
        try {
            await deleteClient(id);
            setClient(client.filter(client => client._id !== id));
        } catch (error) {
            console.error("Errore nell'eliminazione del cliente:", error)
        }

    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (client) => { setClientEdit(client); setShow(true); }

    const [clientEdit, setClientEdit] = useState({
        name: "",
        email: "",
        number: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientEdit((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const updated = await putClient(clientEdit._id, clientEdit);
            setClient((prev) =>
                prev.map((c) => (c._id === updated._id ? updated : c))
            );
            handleClose();
        } catch (error) {
            console.log("Errore nella modifica del cliente", error);
        }
    };

    const [showClient, setShowClient] = useState(false);


    return (
        <Container className="m-5">
            <div className="d-flex justify-content-between mb-3">
                <h2>Clienti</h2>
                <Button onClick={() => setShowClient(true)}>
                    + Nuovo Cliente
                </Button>
            </div>
            <NewClient
                show={showClient}
                handleClose={()=>setShowClient(false)}
                onCreate={fetchClients} 
            />
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Nome e Cognome</th>
                            <th>Email</th>
                            <th>Numero di telefono</th>
                            <th>Modifica</th>
                            <th>Elimina</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {client.map(client => (
                            <tr key={client._id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.number}</td>
                                <td>
                                    <i className="bi bi-pencil-square"
                                        role="button"
                                        onClick={() => handleShow(client)}
                                    >
                                    </i>
                                </td>
                                <td>  <i
                                    className="bi bi-x-square-fill text-danger "
                                    role="button"
                                    onClick={() => handleDeleteClient(client._id)}
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
                        <Form.Label>Nome e Cognome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={clientEdit.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={clientEdit.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Numero di telefono</Form.Label>
                        <Form.Control
                            type="number"
                            name="number"
                            value={clientEdit.number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salva Modificheb
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default Client;