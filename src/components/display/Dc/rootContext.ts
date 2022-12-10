import { createContext } from 'react'
import { IRootDcActionReducerPayload } from './type'

export const RootContext = createContext<any>({
  displayState: {},
  groupsId: [],
  hideGroup: (_id: any) => {},
  __ext__: {
    setDcValue: (_data: IRootDcActionReducerPayload) => {},
    setDcDisplayValue: (_data: IRootDcActionReducerPayload) => {},
    setDcDisplayValueAPart: (_data: IRootDcActionReducerPayload) => {},
    dispatchRootDc: (_data: any) => {}
  }
})
