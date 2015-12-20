
import _ from 'lodash'
import Chance from 'chance'

const chance = new Chance()

export function loadGroups() {
  return new Promise((res) => {
    setTimeout(() => {
      let groups = _.times(30, () => {
        return mockGroup()
      })
      groups = _.mapKeys(groups, 'id')
      res(global.__mockGroups = groups)
    }, 500)
  })
}

export function loadDiscus() {
  return new Promise((res) => {
    setTimeout(() => {
      let discus = _.times(30, () => {
        return mockDiscu()
      })
      discus = _.mapKeys(discus, 'id')
      res(global.__mockDiscus = discus)
    }, 500)
  })
}

function mockGroup() {
  const memberIds = _.sample(
    [ _.keys(global.__mockUsers) ].concat(global.__currUserId),
    _.random(1, 150),
  )
  let adminIds = _.sample(memberIds, _.random(1, 6))
  if (_.random()) { // 一半的概率 自己是admin
    adminIds = _.union(adminIds, global.__currUserId)
  }
  const group = {
    id: chance.guid(),
    title: chance.sentence({ words: _.random(1, 4) }),
    memberIds,
    adminIds,
  }
  return group
}

function mockDiscu() {
  const memberIds = _.sample(
    [ _.keys(global.__mockUsers) ].concat(global.__currUserId),
    _.random(1, 25),
  )
  const discu = {
    id: chance.guid(),
    title: chance.sentence({ words: _.random(1, 4) }),
    memberIds,
  }
  return discu
}