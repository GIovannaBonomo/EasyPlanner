import { useState } from "react"
import { useNavigate } from "react-router-dom";
import instance from "../../data/axios.js";
import { Col, Container, Row } from "react-bootstrap";
import sfondo from "../assets/sfondoEasy.png"


function Login({ setIsAuth }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleLogin = () => {
    window.location.href = import.meta.env.VITE_API_URL + import.meta.env.VITE_GOOGLE_PATH;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/login", { email, password });
      const token = response.data.jwt;
      localStorage.setItem("token", response.data.jwt);
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuth(true)
      navigate("/home");
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Email o password errata!");
    }
  };

  return (
    <Container id="acces-page">
      <Row>
        <Col md={8} className="d-none d-md-block">
          <img src={sfondo} alt="ragazza-con-computer" style={{ width: '100%', height: 'auto'}}/>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center" >
          <div >
            <form onSubmit={handleLogin} className="p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%', backgroundColor: '#f8f9fa' }}>
              <button
                type="button"
                onClick={googleLogin}
                className="btn btn-danger w-100 mb-3"
              >
                Accedi con Google
              </button>
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
                <label htmlFor="password1" className="form-label">Password</label>
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
              <button type="submit" className="btn btn-primary">Accedi</button>
              <p className="text-center mt-3">
                Non hai un account? <a href="/register">Registrati</a>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;