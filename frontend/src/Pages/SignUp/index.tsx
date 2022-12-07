import AuthForm from "../../components/AuthForm";

function SingnUp() {
 function handleRegister(user: string, password: string){

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
