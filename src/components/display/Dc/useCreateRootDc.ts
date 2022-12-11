import { useReducer, Reducer, useCallback } from 'react'
import {
  IRootDcValue,
  IRootDcValueWithContextExt,
  IRootDcActionReducerAction,
  IRootDcActionReducerPayload,
  GroupDcType
} from './type'

const rootDcReducer = (
  state: IRootDcValue,
  action: IRootDcActionReducerAction
) => {
  switch (action.type) {
    // first time settings
    case 'setGroupDcValue': {
      return {
        ...state,
        group: {
          ...state.group,
          [action.payload.id]: action.payload.state
        },
        dcType: {
          ...state.dcType,
          [action.payload.id]: action.payload.dcType
        }
      }
    }

    // updating case
    case 'setGroupDcValueASlice': {
      // @ts-ignore
      const dcType: GroupDcType | undefined = state.dcType[action.payload.id]

      if (dcType !== 'group' && dcType !== 'singleItem') {
        return state
      }

      if (dcType === 'group') {
        return {
          ...state,
          group: {
            ...state.group,
            [action.payload.id]: {
              /** @ts-ignore */
              ...state.group[action.payload.id],
              ...action.payload.state
            }
          }
        }
      }

      if (dcType === 'singleItem') {
        return {
          ...state,
          group: {
            ...state.group,
            [action.payload.id]: !!action.payload.state
          }
        }
      }

      return state
    }

    default: {
      return state
    }
  }
}

export const useCreateRootDc = (): IRootDcValueWithContextExt => {
  const [rootDc, dispatchRootDc] = useReducer<
    Reducer<IRootDcValue, IRootDcActionReducerAction>
  >(rootDcReducer, {
    group: {},
    dcType: {}
  })

  // first time settings
  const setGroupDcValue = useCallback(
    (payload: IRootDcActionReducerPayload): void => {
      dispatchRootDc({
        type: 'setGroupDcValue',
        payload
      })
    },
    []
  )

  // updating case
  const setGroupDcValueASlice = useCallback(
    (payload: IRootDcActionReducerPayload): void => {
      dispatchRootDc({
        type: 'setGroupDcValueASlice',
        payload
      })
    },
    []
  )

  return {
    ...rootDc,
    __ext__: { setGroupDcValue, setGroupDcValueASlice, dispatchRootDc }
  }
}
