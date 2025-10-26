import { useState, useEffect } from "react";
import { useCategories } from "../../Context/CategoriesContext";

const Categories = () => {
  const { categories, subCategories, selectedCategory, fetchSubCategories, setSelectedCategory, loading, loadingSubcategories, error } = useCategories();
  
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsComponentLoading(false);
    }, 1000); 
    
    return () => clearTimeout(timeout);
  }, []);

  if (loading || isComponentLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-emerald-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-12 w-12 bg-emerald-100 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <div className="text-center text-red-600">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">
                Browse Categories
              </h1>
              <p className="text-gray-600">Discover our collection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div 
                  key={category._id}
                  onClick={() => {
                    setSelectedCategory(category);
                    fetchSubCategories(category._id);
                  }}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-72 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-center text-emerald-700 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="mb-8">
              <button 
                onClick={() => setSelectedCategory(null)} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all duration-300 border border-emerald-200"
              >
                <span className="text-xl">←</span>
                Back to Categories
              </button>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
                {selectedCategory.name}
              </h1>
            </div>

            {loadingSubcategories ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
                  <p className="text-emerald-600 font-semibold mt-4 text-center">Loading...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <div 
                      key={sub._id} 
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:scale-105 hover:border-emerald-300"
                    >
                      <div className="flex items-center justify-center h-full">
                        <p className="text-xl font-semibold text-gray-800 text-center">{sub.name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block bg-white p-8 rounded-2xl shadow-lg">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-gray-500 text-lg">No subcategories available</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;