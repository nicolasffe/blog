import React from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default ({ posts, onAction, setNewCommentId, newCommentId }) => {
  const handleDeletePost = async (postId) => {
    await axios.delete(`http://localhost:4000/posts/${postId}`);
    onAction();
  };

  const handleLikePost = async (postId) => {
    await axios.post(`http://localhost:4000/posts/${postId}/like`);
    onAction();
  };

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card shadow-sm mb-4" key={post.id}>
        <div className="card-body">
          <h3 className="card-title">{post.title}</h3>
          <hr />
          {/* Passe as propriedades para os componentes de comentário */}
          <CommentList
            comments={post.comments || []}
            onAction={onAction}
            newCommentId={newCommentId}
          />
          <CommentCreate
            postId={post.id}
            onAction={onAction}
            setNewCommentId={setNewCommentId}
          />
          <div className="d-flex justify-content-end align-items-center mt-3">
            <button
              onClick={() => handleLikePost(post.id)}
              className="btn btn-sm btn-outline-primary me-2"
            >
              ❤️ {post.likes || 0}
            </button>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="btn btn-sm btn-outline-danger"
            >
              Deletar Post
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      {renderedPosts.length > 0 ? (
        renderedPosts
      ) : (
        <p>Nenhum post encontrado. Crie o primeiro!</p>
      )}
    </div>
  );
};