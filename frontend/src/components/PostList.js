import React, { useState, useEffect } from 'react';

const PostList = ({ role, postsUpdated, setPostsUpdated }) => {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null); // Controla qué post está en modo edición
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, [postsUpdated]);

    const handleEdit = (post) => {
        setEditingPostId(post._id);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleSave = async (postId) => {
        await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: editedTitle, content: editedContent })
        });
        setEditingPostId(null); // Salir del modo de edición
        setPostsUpdated(true);
    };

    const handleDelete = async (postId) => {
        await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
        setPostsUpdated(true);
    };

    return (
        <div className="post-list">
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
