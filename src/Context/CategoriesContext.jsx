import { createContext, useContext, useState, useEffect } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = `https://ecommerce.routemisr.com/api/v1`;

  const fetchCategories = async () => {
    setLoading(true);
    fetch(`${baseUrl}/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch(() => setError('Failed to fetch categories'))
      .finally(() => setLoading(false));
  };

  const fetchSubCategories = async (categoryId) => {
    setLoadingSubcategories(true);
    fetch(`${baseUrl}/categories/${categoryId}/subcategories`)
      .then((response) => response.json())
      .then((data) => setSubCategories(data.data))
      .catch(() => setError('Failed to fetch subcategories'))
      .finally(() => setLoadingSubcategories(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider 
      value={{
        categories,
        subCategories,
        selectedCategory,
        loading,
        loadingSubcategories,
        error,
        fetchSubCategories,
        setSelectedCategory
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
