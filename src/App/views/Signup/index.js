import { useAuth } from "context/AuthProvider/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "shared/components/Button";
import Input from "shared/components/Input";
import styled from "styled-components";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  function submit(e) {
    e.preventDefault();

    if (error) return;

    const body = {
      name,
      password,
      email,
    };

    auth.signup(body).then(() => navigate("/"));
  }

  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  return (
    <Container>
      <TextLogo>MyWallet</TextLogo>
      <Form onSubmit={submit}>
        <Input onChange={(e) => setName(e.target.value)} placeholder="Nome" />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value != confirmPassword) {
              setError(true);
              setTextError("Senhas diferentes");
            }
            if (e.target.value === confirmPassword) setError(false);
          }}
          placeholder="Senha"
        />
        <Input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (password != e.target.value) {
              setError(true);
              setTextError("Senhas diferentes");
            }
            if (password === e.target.value) setError(false);
          }}
          placeholder="Confirme a senha"
        />
        <Button>Cadastrar</Button>
        {error ? <ErrorMessage>{textError}</ErrorMessage> : ""}
      </Form>
      <CustomLink to={"/"}>Já tem uma conta? Entre agora!</CustomLink>
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-family: "Raleway";
`;
