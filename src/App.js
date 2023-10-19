import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = (product, ProductID) => {
    const {cartList} = this.state

    this.setState(Previous => ({cartList: [...Previous.cartList, product]}))
  }

  deleteCartItem = ID => {
    const {cartList} = this.state
    const deletedData = cartList.filter(eachItem => eachItem.id !== ID)

    this.setState({
      cartList: deletedData,
    })
  }

  onClickRemove = () => {
    this.setState({
      cartList: [],
    })
  }

  updateCartItem = detailId => {
    this.setState(Previous => ({
      cartList: [
        ...Previous.cartList.map(eachMap => {
          if (eachMap.id === detailId) {
            console.log(eachMap)
            return {...eachMap, quantity: eachMap.quantity + 1}
          }
          return eachMap
        }),
      ],
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            updateCartItem: this.updateCartItem,
            onClickRemove: this.onClickRemove,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
