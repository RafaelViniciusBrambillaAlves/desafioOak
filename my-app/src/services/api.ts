// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
});

// Obter todos os produtos
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Obter um produto especifico
export const getProduct = async (productId: string) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data.product;
  }catch (error){
    console.error('Erro ao buscar o produto:', error);
    throw error;
  }
};

// Criar um novo produto
export const createProduct = async (productData: object) => {
  try{
    const response = await api.post(`/products`, productData)
    console.log(response.data)
    return response.data.product;
  }catch(error){
    console.error('Erro ao criar o produto:', error);
    throw error;
  }
};

// Atualizar um produto existente 
export const updateProduct = async (productId: string, productData: object) => {
  try{
    const response= await api.put(`products/${productId}`, productData);
    return response.data.product;
  }catch(error){
    console.error('Erro ao atualizar o produto:', error);
    throw error;
  }
};

// Excluir produto 
export const deleteProduct = async (productId: string) => {
  try {
    const response = await api.delete(`products/${productId}`)
    return response.data.menssage;
  }catch(error) {
    console.error('Erro ao excluir o produto:', error);
    throw error;
  }
}
