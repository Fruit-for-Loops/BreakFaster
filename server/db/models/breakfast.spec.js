const {expect} = require('chai')
const db = require('../index')
const Breakfast = db.model('breakfast')

describe('Breakfast model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let tofu
  beforeEach(async () => {
    tofu = await Breakfast.create({
      name: 'tofu',
      price: 1500,
      stock: 1
    })
  })
  it('Breakfast name cannot be null', async () => {
    tofu.name = null
    let result, error
    try {
      result = await tofu.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('validation should fail when name is null')
    expect(error).to.be.an.instanceOf(Error)
  })
  it('Breakfast price cannot be null', async () => {
    tofu.price = null
    let result, error
    try {
      result = await tofu.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('validation should fail when price is null')
    expect(error).to.be.an.instanceOf(Error)
  })
  it('Breakfast stock cannot be null', async () => {
    tofu.stock = null
    let result, error
    try {
      result = await tofu.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('validation should fail when stock is null')
    expect(error).to.be.an.instanceOf(Error)
  })
})
