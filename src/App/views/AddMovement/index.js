import { useEffect, useState } from "react";
import { Await, useLocation, useNavigate } from "react-router-dom";
import { Api } from "services/api";
import Button from "shared/components/Button";
import H1 from "shared/components/H1";
import Input from "shared/components/Input";
import Loader from "shared/components/Loader";
import styled from "styled-components";

export default function AddMovement() {
  const location = useLocation();
  const type = location.state.type;
  const method = location.state.method;
  const id = location.state.id;
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onFinish(e) {
    try {
      e.preventDefault();
      setLoading(true);

      const body = {
        value,
        description,
        type: type == "entrada" ? "deposit" : "exit",
      };

      if (method === "post") {
        await Api.post("addMovement", body);
      } else {
        await Api.put(`updateMovement/${id}`, body);
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const getMovement = async () => {
      try {
        setLoading(true);
        const res = await (await Api.get(`movementById/${id}`)).data;
        setLoading(false);
        setValue(res.value);
        setDescription(res.description);
      } catch (error) {
        setLoading(false);
      }
    };

    if (method != "post") {
      getMovement();
    }
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <H1>
        {method === "post" ? "Nova," : "Editar"} {type}
      </H1>
      <Form onSubmit={onFinish}>
        <Input
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Valor"
          value={value}
        />
        <Input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          value={description}
        />
        <Button>
          {method === "post" ? "Salvar" : "Atualizar "} {type}
        </Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
`;
