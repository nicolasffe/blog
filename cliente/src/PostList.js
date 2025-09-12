import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Erro ao buscar posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div className="col-lg-4 col-md-6 col-sm-12" key={post.id}>
      <div className="card p-3 mb-4 h-100">
        {/* Botão deletar no canto superior direito */}
        <button
          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:4000/posts/${post.id}`);
              fetchPosts();
            } catch (err) {
              console.error("Erro ao deletar post:", err);
            }
          }}
        >
          ✖
        </button>

        <div className="card-body d-flex flex-column">
          <h3 className="mb-3">{post.title}</h3>

          {/* Botão like */}
          <div className="mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={async () => {
                try {
                  await axios.post(
                    `http://localhost:4000/posts/${post.id}/like`
                  );
                  fetchPosts();
                } catch (err) {
                  console.error("Erro ao curtir post:", err);
                }
              }}
            >
              👍 {post.likes || 0}
            </button>
          </div>

          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container my-5">
      <div className="row g-4">{renderedPosts}</div>
    </div>
  );
};
