import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import './App.css';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false); // Controla si se muestra el formulario de creación

  useEffect(() => {
    setPostsUpdated(false);
  }, [postsUpdated]);

  return (
      <div>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setRole={setRole} />
        <div className="description">
          <p>Esta plataforma tiene como objetivo exponer las irregularidades en las elecciones, para que todos los miembros de la cofradía conozcan la verdad.</p>
        </div>
        <div className="menu">
          <button onClick={() => setShowCreateForm(false)}>Inicio</button>
          {loggedIn && role === 'admin' && (
              <button onClick={() => setShowCreateForm(true)}>Nueva entrada</button>
          )}
        </div>
        <div className="scroll-container">
          {!showCreateForm ? (
              <PostList role={role} postsUpdated={postsUpdated} setPostsUpdated={setPostsUpdated} />
          ) : (
              <CreatePost setPostsUpdated={setPostsUpdated} setShowCreateForm={setShowCreateForm} />
          )}
        </div>
      </div>
  );
};

export default App;
