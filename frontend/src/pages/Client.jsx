import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { deleteClient, getClient } from "../../data/client";

function Client() {

    const [client, setClient] = useState([]);

    useEffect(() => {
        async function fetchClients() {
            try {
                const data = await getClient();
                setClient(data);
            } catch (error) {
                console.error("Errore nel recuperare la lista dei clienti:", error);
            }
        }

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


    return (
        <Container className="m-5">
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
                                    
                                    ></i>
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
        </Container>
    )
}
export default Client;