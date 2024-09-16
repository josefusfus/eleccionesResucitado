import React, { useState, useEffect } from 'react';

const PostList = ({ role, postsUpdated, setPostsUpdated }) => {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null); // Controla qué post está en modo edición
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // Estado para controlar el orden (descendente por defecto)

    // Detectar si estamos en producción o en desarrollo
    const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://eleccionesresucitado.onrender.com' // URL del backend en producción
        : 'http://localhost:5001'; // URL del backend en desarrollo

    // Función para obtener los posts del backend y aplicar el orden
    useEffect(() => {
        fetch(`${API_URL}/api/posts`)
            .then((res) => res.json())
            .then((data) => {
                const sortedPosts = data.sort((a, b) => {
                    if (sortOrder === 'desc') {
                        return new Date(b.createdAt) - new Date(a.createdAt); // Más nuevos primero
                    } else {
                        return new Date(a.createdAt) - new Date(b.createdAt); // Más antiguos primero
                    }
                });
                setPosts(sortedPosts);
            });
    }, [postsUpdated, sortOrder, API_URL]);

    // Alternar el orden entre ascendente y descendente
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    };

    const handleEdit = (post) => {
        setEditingPostId(post._id);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleSave = async (postId) => {
        await fetch(`${API_URL}/api/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: editedTitle, content: editedContent })
        });
        setEditingPostId(null); // Salir del modo de edición
        setPostsUpdated(true);
    };

    const handleDelete = async (postId) => {
        await fetch(`${API_URL}/api/posts/${postId}`, { method: 'DELETE' });
        setPostsUpdated(true);
    };

    return (
        <div className="post-list">
            {/* Botón para alternar el orden */}
            <button onClick={toggleSortOrder} style={{ marginRight: '10px' }}>
                {sortOrder === 'desc' ? 'Más antiguos primero' : 'Más nuevos primero'}
            </button>

            {/* Lista de posts */}
            {posts.map((post) => (
                <div key={post._id} className="post">
                    {editingPostId === post._id ? (
                        <div>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="input-title"
                            />
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="input-content"
                            />
                        </div>
                    ) : (
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    )}
                    {role === 'admin' && (
                        <div>
                            {editingPostId === post._id ? (
                                <button onClick={() => handleSave(post._id)}>Guardar</button>
                            ) : (
                                <button onClick={() => handleEdit(post)}>Editar</button>
                            )}
                            <button onClick={() => handleDelete(post._id)}>Eliminar</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;
