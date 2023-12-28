import { db } from "../db.js";

export const getProducts = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const q =
    "INSERT INTO produtos(`nome`, `codigo`, `descricao`, `preco`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.codigo,
    req.body.descricao,
    req.body.preco,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto criado com sucesso.");
  });
};

export const updateProduct = (req, res) => {
  const q =
    "UPDATE produtos SET `nome` = ?, `codigo` = ?, `descricao` = ?, `preco` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.codigo,
    req.body.descricao,
    req.body.preco,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduct = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};
