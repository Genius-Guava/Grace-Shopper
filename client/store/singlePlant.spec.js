/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchSinglePlant} from './singlePlant'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {singlePlant: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('setPlant', () => {
    xit('eventually dispatches the SET PLANT action', async () => {
      const fakePlant = {
        name: 'Cheese',
        imageUrl: '',
        price: 10.0,
        description: 'not real',
        light: 'bright',
        quantity: '1'
      }
      mockAxios.onGet('/api/plants/1').replyOnce(200, fakePlant)
      await store.dispatch(fetchSinglePlant(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_PLANT')
    })

    xit('return the plant requested', async () => {
      const fakePlant = {
        name: 'Cheese',
        imageUrl: '',
        price: 10.0,
        description: 'not real',
        light: 'bright',
        quantity: '1'
      }
      mockAxios.onGet('/api/plants/1').replyOnce(200, fakePlant)
      await store.dispatch(fetchSinglePlant(1))
      const actions = store.getActions()
      expect(actions[0].plant).to.be.deep.equal(fakePlant)
    })
  })
})
