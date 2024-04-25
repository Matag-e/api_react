import './App.css'

import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'



const url = "http://localhost:3000/products"


function App() {
  const [products, setProducts] = useState([])

  //4 -CUSTOM HOOK
  const { data: items, httpConfig, loading, error } = useFetch(url)


  const [name, setName] = useState('')
  const [price, setPrice] = useState('')


  //1 Resgatando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     setProducts(data)
  //   }

  //   fetchData();
  // }, []);

  console.log(products)
  // 2 - add products
  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = { name, price }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product)
    // })

    // //3 - CARREGAMENTO DINAMICO
    // const addedProduct = await res.json()

    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // 5 REFATORANDO POST

    httpConfig(product, "POST")
    
    setName('')
    setPrice('')



}



  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - LOADING */}
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!error && items && (
        <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
            {product.description}

          </li>
        ))}
      </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/* 7 - state de loading no post */}
          
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  )
}

export default App
