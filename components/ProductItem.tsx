import { memo, useState } from 'react'
import { AddProductToWishlistProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic'
// import { AddProductToWishList } from './AddProductToWishlist'

import lodash from 'lodash'

const AddProductToWishList = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  onAddWishList(id: number): void;
  product: {
    id: number
    price: number
    title: string
    priceFormatted: string
  }
}

function ProductItemComponent({ product, onAddWishList }: ProductItemProps): JSX.Element {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return (
    <div key={product.id}>
      {product.title} - <strong>{product.priceFormatted}</strong>

      <button onClick={() => setIsAddingToWishlist(true)}>Adicioar aos favoritos</button>

      {isAddingToWishlist && (
        <AddProductToWishList
          onAddWishList={() => onAddWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProsp, nextProps) => {
  return lodash.isEqual(prevProsp.product, nextProps.product)
})