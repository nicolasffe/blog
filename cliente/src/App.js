import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import "./App.css";

export default () => {
  const [posts, setPosts] = useState({});
  const [newCommentId, setNewCommentId] = useState(null); // <-- ADICIONE ESTA LINHA

  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);

    // Limpa o ID do novo comentário após um tempo para não animar novamente
    if (newCommentId) {
      setTimeout(() => setNewCommentId(null), 1500);
    }
  }, [newCommentId]); // Adicione newCommentId às dependências

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const refreshPostsAfterAction = () => {
    setTimeout(() => {
      fetchPosts();
    }, 500);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Meu Blog</h1>
      <PostCreate onAction={refreshPostsAfterAction} />
      <hr className="my-4" />
      {/* Passe o estado e a função para o PostList */}
      <PostList
        posts={posts}
        onAction={refreshPostsAfterAction}
        setNewCommentId={setNewCommentId}
        newCommentId={newCommentId}
      />
    </div>
  );
};