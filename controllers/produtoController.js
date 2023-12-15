const Produto = require('../models/produto'); // Importe a classe Produto
const { validationResult } = require('express-validator'); // Use a validação se necessário

exports.listadeProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.log(error); // Exibe o erro no console
    res.status(500).json({ error: 'Erro ao listar os produtos' });
  }
};

exports.verProdutoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoComCategoria = await Produto.findByIdWithCategory(id);
    if (produtoComCategoria) {
      res.json(produtoComCategoria);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produto com categoria' });
  }
};


exports.adicionarNovoProduto = async (req, res) => {
  const { nome, preco, descricao, estoque, categoria } = req.body;
  
  const novoProduto = new Produto(null, nome, preco, descricao, estoque);

  try {
    const produtoCriado = await Produto.create(novoProduto);

    if (categoria && categoria.id) {
      await Produto.associarCategoria(produtoCriado.id, categoria.id);
    }

    res.status(201).json(produtoCriado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};


exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao, estoque } = req.body;
  try {
    const produto = await Produto.findById(id);
    if (produto) {
      const produtoAtualizado = await Produto.update(id, {
        nome,
        preco,
        descricao,
        estoque,
      });
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

exports.excluirProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findById(id);
    if (produto) {
      await Produto.delete(id);
      res.status(204).send(); // Sem conteúdo
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
};




