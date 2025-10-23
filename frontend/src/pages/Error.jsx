import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Error() {

    const navigare = useNavigate();

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1>404</h1>
            <h2>Pagina non trovata</h2>
            <p>Ops! Qualcosa è andato storto.</p>
            <Button onClick={()=> navigare('/home')}>Torna alla Home</Button>
        </Container>
    )
}
export default Error;