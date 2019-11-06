import React, {Component} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'

export default class PayNowButton extends Component {
  render() {
    return (
      <PayPalButton
        amount="0.01"
        onSuccess={(details, data) => {
          alert('Transaction completed by ' + details.payer.name.given_name)

          // OPTIONAL: Call your server to save the transaction
          return fetch('/paypal-transaction-complete', {
            method: 'post',
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
        }}
        options={{
          clientId:
            'AY8E_Ait23W0p0GG9eQ__y_NXqkGZ43ixiqcvMb4-6lWCwP85i4flnKKm_0vAXfuwYpX6SXZ9gWIJzej'
        }}
      />
    )
  }
}
