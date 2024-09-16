import React, { useState } from 'react';

const CreatePost = ({ setPostsUpdated, setShowCreateForm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        setTitle('');
        setContent('');
        setPostsUpdated(true);
        setShowCreateForm(false); // Ocultar el formulario de creación al enviar
    };

    return (
        <form onSubmit={handleSubmit} className="create-post-form">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Crear Entrada</button>
        </form>
    );
};

export default CreatePost;
