import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import api from "../../service/api";

function SingnUp() {
  const navigate = useNavigate();

  async function handleRegister(user: string, password: string) {
  try { 
    await api.post("/security/register", {
      user,
      password,
    }); 
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
    />
  );
}

export default SingnUp;
