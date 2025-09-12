import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Erro ao buscar comentários:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <ul className="list-group list-group-flush mb-3">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="list-group-item bg-light d-flex justify-content-between align-items-center rounded mb-1"
        >
          {comment.content}
          <div>
            <button
              className="btn btn-sm btn-outline-success me-1"
              onClick={async () => {
                try {
                  await axios.post(
                    `http://localhost:4001/posts/${postId}/comments/${comment.id}/like`
                  );
                  fetchData();
                } catch (err) {
                  console.error("Erro ao curtir comentário:", err);
                }
              }}
            >
              👍 {comment.likes || 0}
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:4001/posts/${postId}/comments/${comment.id}`
                  );
                  fetchData();
                } catch (err) {
                  console.error("Erro ao deletar comentário:", err);
                }
              }}
            >
              ✖
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};