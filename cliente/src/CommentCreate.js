import React, { useState } from "react";
import axios from "axios";

export default ({ postId, onCommentCreated }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para desabilitar o botão

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!content.trim()) {
      setError("O comentário não pode estar vazio.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });

      setContent("");
      
      // --- AQUI ESTÁ A CORREÇÃO ---
      // Espera um pouco para dar tempo ao Query Service de processar o evento.
      setTimeout(() => {
        if (onCommentCreated) {
          onCommentCreated();
        }
      }, 500); // Meio segundo de espera

    } catch (err) {
      console.error("DETALHES DO ERRO (CommentCreate):", err);
      setError("Falha ao enviar o comentário. Verifique o serviço.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-3">
        {error && <div className="alert alert-danger p-2">{error}</div>}
        <div className="form-group">
          <label>Novo Comentário</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            disabled={isSubmitting} // Desabilita durante o envio
          />
        </div>
        <button className="btn btn-primary mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};