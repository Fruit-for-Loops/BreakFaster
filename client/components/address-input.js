import React from 'react'

export const AddressInput = props => {
  return (
    <div>
      <label htmlFor={`${props.type}-name`}>Name</label>
      <input
        name={`${props.type}-name`}
        value={props.address.name}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.type}-street`}>Street Address</label>
      <input
        name={`${props.type}-street`}
        value={props.address.street}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.type}-city`}>City</label>
      <input
        name={`${props.type}-city`}
        value={props.address.city}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.type}-state`}>State</label>
      <input
        name={`${props.type}-state`}
        value={props.address.state}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.type}-zip`}>Zip</label>
      <input
        name={`${props.type}-zip`}
        value={props.address.zip}
        onChange={() => props.handleChange(event)}
      />
    </div>
  )
}
