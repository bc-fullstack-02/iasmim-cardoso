import { useNavigate } from "react-router-dom";
import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../service/api";

function SingnUp() {
  const navigate = useNavigate();

  async function handleRegister(auth: Auth) {
  try { 
    await api.post("/security/register", auth); 
    navigate("/")
  }catch(err){ 
    alert("Error creating new user.")
  }

 }
  
  return (
    <AuthForm
      formTitle="Faça o cadastro e comece a usar"
      submitFormButtonText="Cadastrar"
      submitFormButtonAction={handleRegister}
      linkDescription="Já possui conta? Entre agora!"
      routeName="/"
      showNameInput 
    />
  );
}

export default SingnUp;
