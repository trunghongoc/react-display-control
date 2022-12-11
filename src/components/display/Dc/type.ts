import { Dispatch } from 'react'

/** Common */
export type IdType = string | number
export type RenderMode = 'render' | 'css'
export type GroupDcType = 'group' | 'singleItem'
/** .Common */

/** Group */
export interface IGroupValue {
  display: {
    [key: IdType]: boolean
  }
}

export type UseDisplayControlValue = {
  state: IGroupDisplayItems
  setDisplay: (dispayConfig: IGroupDisplayItems | boolean) => void
  displayAll: () => void
  hideAll: () => void
} | null
/** .Group */

/** Root use create DC */
export interface IGroupDisplayItems {
  [key: IdType]: boolean
}
export interface IRootDcValue {
  group: {
    [key: IdType]: IGroupDisplayItems | boolean
  }

  dcType: {
    [groupId: string | number]: GroupDcType
  }
}

export interface IRootDcValueWithContextExt extends IRootDcValue {
  __ext__: {
    // setDcValue: (data: IRootDcActionReducerPayload) => void
    setGroupDcValue: (data: IRootDcActionReducerPayload) => void
    setGroupDcValueASlice: (data: IRootDcActionReducerPayload) => void
    dispatchRootDc: Dispatch<IRootDcActionReducerAction>
  }
}

export interface IRootDcActionReducerPayload {
  id: IdType
  dcType: GroupDcType
  state: any
}

export interface IRootDcActionReducerAction {
  type: string
  payload: IRootDcActionReducerPayload
}
/** .Root use create DC */
