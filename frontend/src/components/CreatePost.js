import React, { useState } from 'react';

const CreatePost = ({ setPostsUpdated, setShowCreateForm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Detectar si estamos en producción o en desarrollo
    const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://eleccionesresucitado.onrender.com' // URL del backend en producción
        : 'http://localhost:5001'; // URL del backend en desarrollo (cambia el puerto si es necesario)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Hacer la solicitud al backend con la URL correcta
        const res = await fetch(`${API_URL}/api/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            setTitle('');
            setContent('');
            setPostsUpdated(true);
            setShowCreateForm(false); // Ocultar el formulario de creación al enviar
        } else {
            console.error('Error al crear la entrada');
        }
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
