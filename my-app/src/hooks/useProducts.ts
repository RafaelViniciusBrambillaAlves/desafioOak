// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { getProducts, updateProduct, deleteProduct, createProduct } from '../services/api.ts';

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = async (newProduct: object) => {
    try{
      console.log('Adicionando produto:', newProduct);
      const createdProduct = await createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    }catch(error){
      setError('Erro ao adicionar produto');
      console.error(error);
    }
  }

  const handleUpdate = async (productId: string, updatedProduct: object) => {
    try{
      const update = await updateProduct(productId, updatedProduct);
      setProducts((prevProducts) => 
        prevProducts.map((product) => (product.id == productId ? update : product))
      );
    }catch(error){
      setError('Erro ao atualizar o produto')
      console.error(error)
    }
  };

  const handleDelete = async (productId: string) => {
    try{
      const message = await deleteProduct(productId);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    }catch(error){
      setError('Erro ao excluir produto')
      console.error(error);
    }
  };

  return { 
    products, 
    loading, 
    error,
    handleDelete,
    handleAdd,
    handleUpdate, 
  };
};
