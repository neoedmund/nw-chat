
import _ from 'lodash'
import Chance from 'chance'
import localface from 'localface'
import { FEMALE, MALE, INVALID_LOGIN_INFO } from '../const'

const chance = new Chance()

export function userLogin(id, password) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (password !== '123') {
        return rej(new Error(INVALID_LOGIN_INFO))
      }
      const user = mockUser()
      user.id = id
      user.name = id
      global.__currUserId = id
      res(user)
    }, 100)
  })
}

export function loadUsers() {
  return new Promise((res) => {
    setTimeout(() => {
      let users = _.times(500, () => {
        return mockUser()
      })
      users = _.mapKeys(users, 'id')
      res(users)
    }, 50)
  })
}

function mockUser() {
  const gender = _.random() ? FEMALE : MALE
  const first = chance.first()
  const last = chance.last()
  const user = {
    id: `${first}.${last}`.toLowerCase(),
    name: `${first} ${last}`,
    gender,
    avatar: localface.get(gender === FEMALE ? 'f' : 'm'),
    emotion: chance.sentence(),
    phone: chance.phone(),
    email: chance.email(),
  }
  global.__mockUsers = {
    ...global.__mockUsers,
    [user.id]: user,
  }
  return user
}
