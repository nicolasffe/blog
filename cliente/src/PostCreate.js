import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(""); // Novo estado para guardar o erro

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpa erros anteriores

    if (!title.trim()) {
      setError("O título não pode estar vazio.");
      return;
    }

    // Adicionado try...catch para capturar o erro
    try {
      await axios.post("http://localhost:4000/posts", {
        title,
      });
      setTitle("");
    } catch (err) {
      console.error("DETALHES DO ERRO:", err); // Log mais detalhado no console
      setError("Falha ao criar o post. Verifique se o serviço está rodando. (Erro 404)");
    }
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        {/* Exibe a mensagem de erro para o usuário */}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Título do Post</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Escreva algo..."
            />
          </div>
          <button className="btn btn-success w-100">Publicar 🚀</button>
        </form>
      </div>
    </div>
  );
};