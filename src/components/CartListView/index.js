import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

import EmptyCartView from '../EmptyCartView'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.length === 0 ? (
            <EmptyCartView />
          ) : (
            cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))
          )}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
