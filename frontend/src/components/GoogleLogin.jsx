import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {

  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get("jwt");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); 
      alert("Login effettuato con successo!");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>Caricamento...</div>;

}
export default GoogleLogin;