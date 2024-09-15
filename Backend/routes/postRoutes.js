const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost); // Crear entrada
router.get('/', getPosts); // Obtener entradas
router.put('/:postId', updatePost); // Editar entrada
router.delete('/:postId', deletePost); // Eliminar entrada

module.exports = router;
