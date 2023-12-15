const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/listar', produtoController.listadeProdutos);

router.get('/chave/:id', produtoController.verProdutoEspecifico);

router.post('/criar', produtoController.adicionarNovoProduto);

router.put('/editar/chave/:id', produtoController.atualizarProduto);

router.delete('/deletar/chave/:id', produtoController.excluirProduto);



module.exports = router;
