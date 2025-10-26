import { useEffect, useState } from 'react'
import { useBrands } from '../../Context/BrandsContext'
import { useLocation } from 'react-router-dom';

export default function Brands() {
  const { pathname } = useLocation(); 
  const { brands, loading, error, getAllBrands, getSpecificBrand } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); 

  useEffect(() => {
    document.title = "Fresh Cart | Brands";
  }, []);

  useEffect(() => {
    setPageLoading(true);
    getAllBrands().then(() => setPageLoading(false));
  }, [pathname]); 

  const handleBrandClick = async (brandId) => {
    setLoadingBrand(true);
    const brandDetails = await getSpecificBrand(brandId);
    setLoadingBrand(false);

    if (brandDetails) {
      setSelectedBrand(brandDetails);
      setIsModalOpen(true);
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex justify-center items-center p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">
            All Brands
          </h2>
          <p className="text-gray-600">Explore our trusted partners</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleBrandClick(brand._id)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:scale-105 border border-gray-100"
            >
              <div className="aspect-square overflow-hidden mb-4 bg-gray-50 rounded-xl p-4">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all animate-scaleIn">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {loadingBrand ? "Loading..." : selectedBrand?.name}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 transform duration-300"
                >
                  <span className="text-3xl font-light">×</span>
                </button>
              </div>

              {loadingBrand ? (
                <div className="flex justify-center items-center py-12">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
                    <img
                      src={selectedBrand.image}
                      alt={selectedBrand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{selectedBrand.name}</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}