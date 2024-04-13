import { useContext, useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function SignIn() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/signIn", { email, password });

      if (response.error) {
        console.log(response.error);
      } else {
        setEmail("");
        setPassword("");
        setUser(response.data);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signIn-body">
      <div className="box-login">
        <form onSubmit={handleSubmit} className="form-login">
          <h2>Login</h2>
          <div className="inputBx-login">
            <span></span>
            <input onChange={onChangeEmail} type="text" placeholder="Usuario" value={email} />
          </div>
          <div className="inputBx-login">
            <span></span>
            <input onChange={onChangePassword} type="password" placeholder="Contraseña" value={password} />
          </div>
          <div className="inputBx-login">
            <input className="submit-login" type="submit" value="Iniciar Sesion" />
          </div>
        </form>
      </div>
    </div>
  );
}
