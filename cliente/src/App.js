// cliente/src/App.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import "./App.css";

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Função para dar um tempo para os eventos se propagarem
  const refreshPostsAfterAction = () => {
      setTimeout(() => {
          fetchPosts();
      }, 500); // 500ms de espera
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Meu Blog com Microsserviços</h1>
      <PostCreate onAction={refreshPostsAfterAction} />
      <hr className="my-4" />
      <PostList posts={posts} onAction={refreshPostsAfterAction} />
    </div>
  );
};