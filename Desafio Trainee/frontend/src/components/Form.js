import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const product = ref.current;

      product.nome.value = onEdit.nome;
      product.codigo.value = onEdit.codigo;
      product.fone.descricao = onEdit.descricao;
      product.preco.value = onEdit.preco;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = ref.current;

    if (
      !product.nome.value ||
      !product.codigo.value ||
      !product.descricao.value ||
      !product.preco.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3000/" + onEdit.id, {
          nome: product.nome.value,
          codigo: product.codigo.value,
          descricao: product.descricao.value,
          preco: product.preco.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3000", {
          nome: product.nome.value,
          codigo: product.codigo.value,
          descricao: product.descricao.value,
          preco: product.preco.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    product.nome.value = "";
    product.codigo.value = "";
    product.descricao.value = "";
    product.preco.value = "";

    setOnEdit(null);
    getProducts();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Código</Label>
        <Input name="codigo" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="preco" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
