// src/pages/Products.tsx
import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts.ts';
import '../styles/Products.css';
import Product from '../../../api/models/product.js';

const Products = () => {
  const { products, loading, error, handleAdd, handleDelete, handleUpdate } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'valor', direction: 'asc' });
  const [showAddForm, setShowAddForm] = useState(false); 
  const [newProduct, setNewProduct] = useState({
    nome: '',
    descricao: '',
    valor: '',
    status: true
  });

  const handleSortValor = (key) => {
    setSortConfig((prevConfig) => {
      const newDirection = prevConfig.key == key && prevConfig.direction == 'asc' ? 'desc': 'asc'
      return { key, direction: newDirection};
    });
  };

  const handleSortNome = (key) => {
    setSortConfig((prevConfig) => {
      const newDirection = prevConfig.key == key && prevConfig.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction: newDirection }; 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct, 
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.nome && newProduct.valor){
      handleAdd(newProduct);
      setNewProduct({ nome: '', descricao: '', valor: '', status: true });
      setShowAddForm(false);
    }else{
      alert('Preencha todos os campos obrigatórios.')
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevProduct) => ({ ...prevProduct, [name]: value}));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdate(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  const filteredProducts = [...products]
  .filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const valorA = a[sortConfig.key]; 
    const valorB = b[sortConfig.key];

    if (sortConfig.key == 'nome'){
      if (sortConfig.direction === 'asc') {
        return valorA.localeCompare(valorB);
      }
      return valorB.localeCompare(valorA);
    }
    if (sortConfig.direction === 'asc') {
      return valorA - valorB;
    }
    return valorB - valorA;
  });

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-container">
      <h1 className="title">Lista de Produtos</h1>
      <div>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar produtos..."
          value={searchTerm}   
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-add" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancelar' : 'Adicionar Produto'}
        </button>
      </div>
      
      {showAddForm && (
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={newProduct.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={newProduct.descricao}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Valor:</label>
            <input
              type="number"
              name="valor"
              value={newProduct.valor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={newProduct.status}
              onChange={handleInputChange}
            >
              <option value={true}>Ativo</option>
              <option value={false}>Inativo</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Adicionar
            </button>
          </div>
        </form>
      )}

      {editingProduct && (
        <form onSubmit={handleEditSubmit} className="add-product-form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={editingProduct.nome}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={editingProduct.descricao}
              onChange={handleEditChange}
            />
          </div>
          <div className="form-group">
            <label>Valor:</label>
            <input
              type="number"
              name="valor"
              value={editingProduct.valor}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={editingProduct.status}
              onChange={handleEditChange}
            >
              <option value={true}>Ativo</option>
              <option value={false}>Inativo</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Atualizar
            </button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => setEditingProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
            <th onClick={() => handleSortNome('nome')} style={{cursor: 'pointer'}}>
                Nome{' '}
                {sortConfig.key == 'nome' && (
                  <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </th> 
              <th>Descrição</th>
              <th onClick={() => handleSortValor('valor')} style={{cursor: 'pointer'}}>
                Valor{' '}
                {sortConfig.key == 'valor' && (
                  <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.nome}</td>
                <td>{product.descricao ? product.descricao : 'Sem descrição'}</td>
                <td>R$ {product.valor}</td>
                <td className={product.status ? 'status-active' : 'status-inactive'}>
                  {product.status ? 'Ativo' : 'Inativo'}
                </td>
                <td>
                  <button className="btn-action" onClick={() => setEditingProduct(product)}>
                    Editar
                  </button>
                  <button className="btn-action btn-delete" onClick={()=> handleDelete(product.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Products;
