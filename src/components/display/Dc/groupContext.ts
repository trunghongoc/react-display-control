import { createContext } from 'react'
import { IdType } from './type'

export const GroupContext = createContext<any>({
  groupId: '',
  addIdToIds: (_id: IdType) => {},
  addIdToDuplicatedIds: (_id: IdType) => {}
})
