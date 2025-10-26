import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const BrandsContext = createContext()

export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getAllBrands = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data)
      setLoading(false)
      return data.data
    } catch (err) {
      setError('Failed to fetch brands')
      setLoading(false)
      return null
    }
  }

  const getSpecificBrand = async (brandId) => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
      return data.data
    } catch (err) {
      console.error('Error fetching brand details:', err)
      return null
    }
  }

  const values = {
    brands,
    loading,
    error,
    getAllBrands,
    getSpecificBrand
  }

  return (
    <BrandsContext.Provider value={values}>
      {children}
    </BrandsContext.Provider>
  )
}

export function useBrands() {
  const context = useContext(BrandsContext)
  if (!context) {
    throw new Error('useBrands must be used within a BrandsProvider')
  }
  return context
}