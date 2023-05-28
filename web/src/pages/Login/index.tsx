import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useCheckinUser } from "../../hooks/checkin.hook";

const Login = () => {
  const { loginUser } = useCheckinUser();
  const [code, setCode] = useState("");

  return (
    <>
      <h1 className="text-left text-xl font-light mb-5">
        Ponto <span className="font-extrabold">Ilumeo</span>
      </h1>
      <Input
        label="Código do usuário"
        id="userCode"
        onChange={(e) => setCode(e.currentTarget.value.toUpperCase())}
        value={code}
      />
      <Button onClick={() => loginUser(code)}>Confirmar</Button>
    </>
  );
};

export default Login;
