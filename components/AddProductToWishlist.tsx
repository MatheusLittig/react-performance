export interface AddProductToWishlistProps {
  onAddWishList(): void
  onRequestClose(): void
}

export function AddProductToWishList({
  onAddWishList, 
  onRequestClose
}: AddProductToWishlistProps): JSX.Element {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  )
}