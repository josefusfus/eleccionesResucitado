const Post = require('../models/Post');

// Crear una entrada
const createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.userId }); // Usar req.userId para asignar el usuario
    await post.save();
    res.status(201).send('Post created');
};

// Obtener todas las entradas
const getPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 }); // Asegurarse de que se incluya el nombre del autor
    res.json(posts);
};

// Editar una entrada
const updatePost = async (req, res) => {
    const { id } = req.params; // Cambiar postId a id
    const { title, content } = req.body;
    const post = await Post.findById(id);
    if (!post) return res.status(404).send('Post not found');
    post.title = title;
    post.content = content;
    await post.save();
    res.send('Post updated');
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.status(200).send('Post deleted');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
