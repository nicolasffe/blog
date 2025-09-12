import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) return; // evita criar vazio

    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
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