const { initOptions, connectionString } = require('../db'); // Importe initOptions e connectionString

const pgp = require('pg-promise')(initOptions);
const db = pgp(connectionString);

class Produto {
  constructor(id, nome, preco, descricao, estoque) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.estoque = estoque;
  }


  static create(produto) {
    return db.one('INSERT INTO produtos (nome, preco, descricao, estoque) VALUES ($1, $2, $3, $4) RETURNING *', [
      produto.nome,
      produto.preco,
      produto.descricao,
      produto.estoque
    ]);
  }

  static findAll() {
    return db.manyOrNone('SELECT * FROM produtos');
  }

  static findById(id) {
    return db.oneOrNone('SELECT * FROM produtos WHERE id = $1', [id]);
  }

  static update(id, produto) {
    return db.one('UPDATE produtos SET nome=$1, preco=$2, descricao=$3, estoque=$4 WHERE id=$5 RETURNING *', [
      produto.nome,
      produto.preco,
      produto.descricao,
      produto.estoque,
      id
    ]);
  }

  static delete(id) {
    return db.none('DELETE FROM produtos WHERE id=$1', [id]);
  }

  static getPedidosDoProduto(idProduto) {
    return db.manyOrNone(
      'SELECT p.id AS pedido_id, pp.quantidade, p.data FROM pedidos p JOIN pedido_produto pp ON p.id = pp.pedido_id WHERE pp.produto_id = $1',
      [idProduto]
    );
  }

  static associarCategoria(idProduto, idCategoria) {
    return db.none('INSERT INTO produto_categoria (produto_id, categoria_id) VALUES ($1, $2)', [idProduto, idCategoria]);
  }

static findByIdWithCategory(id) {
  return db.oneOrNone(`
    SELECT p.id, p.nome, p.preco, p.descricao, p.estoque,
           c.id AS categoria_id, c.nome AS categoria_nome
    FROM produtos p
    LEFT JOIN produto_categoria pc ON p.id = pc.produto_id
    LEFT JOIN categorias c ON pc.categoria_id = c.id
    WHERE p.id = $1
  `, [id]);
}



}

module.exports = Produto;
