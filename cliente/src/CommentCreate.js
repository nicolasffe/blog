import React, { useState } from "react";
import axios from "axios";

export default ({ postId, onAction, setNewCommentId }) => { 
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setNewCommentId(res.data.id); 

    setContent("");
    onAction();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-3">
        <div className="form-group">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Escreva seu comentário..."
          />
        </div>
        <button className="btn btn-primary mt-2">Enviar</button>
      </form>
    </div>
  );
};