import React from 'react'
import {getCart} from '../store/cart'
import {connect} from 'react-redux'
import {getSingleBreakfast} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.getItems = this.getItems.bind(this)
  }

  componentDidMount() {
    this.props.getCartThunk()
    // this.props.getSingleBreakfastThunk()
  }

  getItems() {
    const items = this.props.cart.items
    console.log('items:', items)
    const returnObj = {}
    if (!items) {
      console.log('no items')
    } else {
      items.forEach(item => {
        if (!returnObj[item]) {
          returnObj[item] = 1
        } else {
          returnObj[item]++
        }
      })
    }
    return returnObj
  }

  render() {
    const items = this.getItems()
    const objectKeys = Object.keys(items)
    return (
      <div>
        {objectKeys.map(itemId => {
          const breakfastObj = this.props.getSingleBreakfastThunk(itemId)
          return (
            <div>
              <h2>{breakfastObj.name}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => ({
  getCartThunk: () => dispatch(getCart()),
  getSingleBreakfastThunk: id => dispatch(getSingleBreakfast(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// needs delete button
// needs to be able to change quantity
// checkout button

/* user logs in
check if they have a current cart. if so, display items. if not, blank.
*** So, component above will render IF user has a current cart. (or upon adding first item to cart)
user clicks 'add to cart'
if they have a current cart, send put request to add additional item to cart
if they do not have a current cart, send post request to cart table

user is not logged in:
check if cartid on session is null
if it's not null, display cart items
if it is null, blank

if they have a current cart, send put request to add additional item to cart
if they do not have a current cart, send post request to cart table, then add that instance's id to the cartid in the session
*/
