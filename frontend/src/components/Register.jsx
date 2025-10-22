import { useState } from "react";
import instance from "../../data/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import sfondo from "../assets/sfondoEasy.png"

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/register", { email, password });
      alert("Registrazione avvenuta con successo!");
      navigate("/login");
    }
    catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Errore durante la registrazione!";
        alert(errorMessage);
    }

  }

  const googleLogin = () => {
    window.location.href = import.meta.env.VITE_API_URL + import.meta.env.VITE_GOOGLE_PATH;
  };

  return (
    <Container id="acces-page">
      <Row>
        <Col md={8} className="d-none d-md-block">
          <img src={sfondo} alt="ragazza-con-computer" style={{ width: '100%', height: 'auto' }} />
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center" >
          <div>
            <form
              onSubmit={handleRegister}
              className="p-4 rounded shadow"
              style={{ maxWidth: '400px', width: '100%', backgroundColor: '#f8f9fa' }}
            >
              <button
                type="button"
                onClick={googleLogin}
                className="btn btn-danger w-100 mb-3"
              >
                Registrati con Google
              </button>


              <h3 className="text-center mb-4">Registrazione</h3>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Inserisci la tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Inserisci la tua password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Registrati
              </button>

              <p className="text-center mt-3">
                Hai già un account? <a href="/login">Accedi</a>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Register;