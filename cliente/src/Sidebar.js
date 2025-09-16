// cliente/src/Sidebar.js
import React, { useState } from 'react';
const AccordionWidget = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="widget-title" onClick={onClick}>
        <span>{title}</span>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>+</span>
      </h4>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// Componente principal da Sidebar
const Sidebar = ({ posts }) => {
  const [openWidget, setOpenWidget] = useState('recent-posts');

  const handleWidgetClick = (widgetName) => {
    setOpenWidget(openWidget === widgetName ? null : widgetName);
  };

  const recentPosts = Object.values(posts).slice(0, 3);

  return (
    <aside className="sidebar">
      {/* Widget de Pesquisa */}
      <div className="sidebar-widget">
        <input type="search" className="search-bar" placeholder="Pesquisar no blog..." />
      </div>

      {/* Widget Sobre */}
      <AccordionWidget
        title="Sobre o Blog"
        isOpen={openWidget === 'about'}
        onClick={() => handleWidgetClick('about')}
      >
        <p>
          Este é um blog sobre tecnologia e desenvolvimento, construído com microsserviços, React e muito café!
        </p>
      </AccordionWidget>

      {/* Widget de Categorias */}
      <AccordionWidget
        title="Categorias"
        isOpen={openWidget === 'categories'}
        onClick={() => handleWidgetClick('categories')}
      >
        <ul className="widget-list">
          <li>Microsserviços</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Prisma</li>
        </ul>
      </AccordionWidget>

      {/* Widget de Posts Recentes (agora dinâmico) */}
      <AccordionWidget
        title="Posts Recentes"
        isOpen={openWidget === 'recent-posts'}
        onClick={() => handleWidgetClick('recent-posts')}
      >
        <ul className="widget-list">
          {recentPosts.length > 0 ? (
            recentPosts.map(post => <li key={post.id}>{post.title}</li>)
          ) : (
            <li>Nenhum post ainda.</li>
          )}
        </ul>
      </AccordionWidget>
    </aside>
  );
};

export default Sidebar;