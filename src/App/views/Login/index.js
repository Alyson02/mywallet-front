import { useAuth } from "context/AuthProvider/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "shared/components/Button";
import Input from "shared/components/Input";
import styled from "styled-components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  function onFinish(e) {
    e.preventDefault();

    auth
      .authenticate(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  return (
    <Container>
      <TextLogo>MyWallet</TextLogo>
      <Form onSubmit={onFinish}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <Button>Entrar</Button>
      </Form>
      <CustomLink to={"/cadastro"}>Primeira vez? Cadastre-se!</CustomLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 0 24px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const TextLogo = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #fff;
  font-family: "Saira Stencil One", cursive;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
`;

const CustomLink = styled(Link)`
  color: white;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;
