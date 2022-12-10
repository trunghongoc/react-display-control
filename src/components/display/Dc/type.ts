import { Dispatch } from 'react'

/** Common */
export type IdType = string | number
export type RenderMode = 'render' | 'css'
/** .Common */

/** Group */
export interface IGroupValue {
  display: {
    [key: IdType]: boolean
  }
}

export type UseDisplayControlValue = {
  state: IGroupDisplayItems
  setDisplay: (dispayConfig: IGroupDisplayItems) => void
  displayAll: () => void
  hideAll: () => void
} | null
/** .Group */

/** Root use create DC */
export interface IGroupDisplayItems {
  [key: IdType]: boolean
}
export interface IUseCreateRootDcGroupsValue<IGroupsId> {
  group: IGroupDisplayItems
}

interface IRootDcValueHelpers {
  displayState: {
    [key: IdType]: {
      [key: IdType]: boolean
    }
  }

  groupsId: IdType[]
}

interface IRootDcValueMethodsOptional<IGroupsId> {
  hideGroup?: (id: IGroupsId) => void
}

type IRootDcValueMethodsRequired<IGroupsId> = {
  [key in keyof IRootDcValueMethodsOptional<IGroupsId>]: IRootDcValueMethodsOptional<IGroupsId>[key]
}

export interface IRootDcValue<IGroupsId extends any>
  extends IUseCreateRootDcGroupsValue<IGroupsId>,
    IRootDcValueHelpers,
    IRootDcValueMethodsOptional<IGroupsId> {}

export interface IRootDcValueWithContextExt<IGroupsId extends unknown>
  extends IUseCreateRootDcGroupsValue<IGroupsId>,
    IRootDcValueHelpers,
    IRootDcValueMethodsRequired<IGroupsId> {
  __ext__: {
    setDcValue: (data: IRootDcActionReducerPayload) => void
    setDcDisplayValue: (data: IRootDcActionReducerPayload) => void
    setDcDisplayValueAPart: (data: IRootDcActionReducerPayload) => void
    dispatchRootDc: Dispatch<IRootDcActionReducerAction>
  }
}

export interface IRootDcActionReducerPayload {
  id: IdType
  data: IGroupValue | any
}

export interface IRootDcActionReducerAction {
  type: string
  payload: IRootDcActionReducerPayload
}
/** .Root use create DC */
