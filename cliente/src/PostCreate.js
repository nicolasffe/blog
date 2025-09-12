import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) return; // não cria post vazio

    try {
      await axios.post("http://localhost:4000/posts", { title });
      setTitle("");
      window.location.reload(); // atualizar a lista de posts
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  };

  return (
    <div className="container my-4">
      <form onSubmit={onSubmit} className="d-flex flex-column">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Digite o título do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary align-self-start">Criar Post</button>
      </form>
    </div>
  );
};
