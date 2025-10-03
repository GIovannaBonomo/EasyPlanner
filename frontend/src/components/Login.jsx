import { useState } from "react"
import { useNavigate } from "react-router-dom";
import instance from "../../data/axios.js";


function Login({setIsAuth}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/login", { email, password });
      localStorage.setItem("token", response.data.jwt);
      navigate("/home");
      setIsAuth(true)
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Email o password errata!");
    }
  };

    return(
       <form onSubmit={handleLogin}>
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
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    );
}

export default Login;