import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <>
      <header>Meu Blog</header>
      <PostCreate />
      <PostList />
      <footer>© 2025 Meu Blog. Todos os direitos reservados.</footer>
    </>
  );
}

export default App;
