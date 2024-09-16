const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

// Crear entrada
router.post('/', createPost);

// Obtener todas las entradas
router.get('/', getPosts);

// Editar entrada
router.put('/:id', updatePost);

// Eliminar entrada
router.delete('/:id', deletePost);

module.exports = router;
