// cliente/src/App.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import Sidebar from "./Sidebar";
import "./App.css";

export default () => {
  const [posts, setPosts] = useState({});
  const [newCommentId, setNewCommentId] = useState(null);

  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
    if (newCommentId) {
      setTimeout(() => setNewCommentId(null), 1500);
    }
  }, [newCommentId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const refreshPostsAfterAction = () => {
    setTimeout(() => {
      fetchPosts();
    }, 500);
  };

  return (
    <>
      <Navbar /> {/* <-- 3. ADICIONE O NAVBAR NO TOPO */}
      
      <div className="container">
        <h1 className="main-title">Aproveite esse blog!</h1>
        
        <div className="main-layout">
          <main className="content-area">
            <PostCreate onAction={refreshPostsAfterAction} />
            <hr className="my-4" />
            <PostList
              posts={posts}
              onAction={refreshPostsAfterAction}
              setNewCommentId={setNewCommentId}
              newCommentId={newCommentId}
            />
          </main>
          <Sidebar posts={posts} />
        </div>
      </div>
    </>
  );
};