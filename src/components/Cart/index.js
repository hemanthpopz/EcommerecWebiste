import Header from '../Header'
import CartListView from '../CartListView'
import './index.css'

import cartContext from '../../context/CartContext'

const Cart = () => (
  <cartContext.Consumer>
    {value => {
      const {cartList, onClickRemove} = value
      const priceList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )

      const sumOfList =
        priceList.length !== 0 ? priceList.reduce((acc, sum) => acc + sum) : 0

      const onClickBtn = () => {
        onClickRemove()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            <div className="cart-content-container">
              <div className="remove-container">
                <h1 className="cart-heading">My Cart</h1>
                <button onClick={onClickBtn} className="remove-btn">
                  Remove All
                </button>
              </div>
              <CartListView />
              <div className="total-checkout">
                <div className="checkout-container">
                  <p className="order">
                    Order Total: <span className="total">RS {sumOfList}</span>
                  </p>
                  <p className="order">{cartList.length} items in cart</p>
                  <button className="checkout">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }}
  </cartContext.Consumer>
)
export default Cart
