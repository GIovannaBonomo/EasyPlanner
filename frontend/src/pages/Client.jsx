import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
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
            console.error("Errore nella modifica del cliente", error);
        }
    };

    const [showClient, setShowClient] = useState(false);


    return (
        <Container className="vh-100">
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
                <Col xs={12}>
                <Table striped bordered hover className="d-none d-sm-table">
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
               <div className="d-block d-sm-none">
            {client.map((c) => (
              <div
                key={c._id}
                className="card mb-2 p-2 shadow-sm"
                style={{ borderRadius: "0.3rem" }}
              >
                <p>
                  <strong>Nome e Cognome:</strong> {c.name}
                </p>
                <p>
                  <strong>Email:</strong> {c.email}
                </p>
                <p>
                  <strong>Numero di telefono:</strong> {c.number}
                </p>
                <div className="d-flex justify-content-end gap-3">
                  <i
                    className="bi bi-pencil-square"
                    role="button"
                    onClick={() => handleShow(c)}
                  ></i>
                  <i
                    className="bi bi-x-square-fill text-danger"
                    role="button"
                    onClick={() => handleDeleteClient(c._id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
                </Col>
            </Row>

            <Modal show={show}>
                    <Modal.Title className="m-3">Modifica Cliente</Modal.Title>
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