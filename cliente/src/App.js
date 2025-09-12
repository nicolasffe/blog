import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import "./App.css";

export default () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/">
            🚀 My Blog
          </a>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container">
        <h2 className="mb-4 text-center text-primary">Criar novo post</h2>
        <PostCreate />
        <hr />
        <h2 className="mb-4 text-center text-success">Posts recentes</h2>
        <PostList />
      </div>
    </div>
  );
};