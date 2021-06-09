import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";

interface Results {
  data: any[]
  totalPrice: number
}

export default function Home(): JSX.Element {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => {
      return {
        ...product,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0)

    setResults({ data: products, totalPrice });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search products</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <SearchResults 
        results={results.data} 
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}
