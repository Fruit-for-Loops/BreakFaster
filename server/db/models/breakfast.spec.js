const {expect} = require('chai')
const db = require('../index')
const Breakfast = db.model('breakfast')

describe('Breakfast model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('Breakfast name cannot be null', async () => {
    let tofu = await Breakfast.create({
      name: 'tofu',
      price: 1500
    })

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
})
