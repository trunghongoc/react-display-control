import { useReducer, Reducer, useCallback } from 'react'
import {
  IRootDcValue,
  IRootDcValueWithContextExt,
  IRootDcActionReducerAction,
  IRootDcActionReducerPayload
} from './type'

const rootDcReducer = <IGroupsId>(
  state: IRootDcValue<IGroupsId>,
  action: IRootDcActionReducerAction
) => {
  switch (action.type) {
    case 'setGroupDcValue': {
      return {
        ...state,
        group: {
          ...state.group,
          [action.payload.id]: action.payload.data
        }
      }
    }

    case 'setGroupDcDisplayValue': {
      return {
        ...state,
        group: {
          ...state.group,
          [action.payload.id]: action.payload.data
        }
      }
    }

    case 'setGroupDcDisplayValueAPart': {
      return {
        ...state,
        group: {
          ...state.group,
          [action.payload.id]: {
            /** @ts-ignore */
            ...state.group[action.payload.id],
            ...action.payload.data
          }
        }
      }
    }

    default: {
      return state
    }
  }
}

export const useCreateRootDc = <
  IGroupsId
>(): IRootDcValueWithContextExt<IGroupsId> => {
  const [rootDc, dispatchRootDc] = useReducer<
    Reducer<IRootDcValue<IGroupsId>, IRootDcActionReducerAction>
  >(rootDcReducer, {
    displayState: {},
    groupsId: [],
    group: {}
  })

  const hideGroup = useCallback((id: IGroupsId) => {
    // ...
  }, [])

  const setDcValue = useCallback((data: IRootDcActionReducerPayload): void => {
    dispatchRootDc({
      type: 'setGroupDcValue',
      payload: data
    })
  }, [])

  const setDcDisplayValue = useCallback(
    (data: IRootDcActionReducerPayload): void => {
      dispatchRootDc({
        type: 'setGroupDcDisplayValue',
        payload: data
      })
    },
    []
  )

  const setDcDisplayValueAPart = useCallback(
    (data: IRootDcActionReducerPayload): void => {
      dispatchRootDc({
        type: 'setGroupDcDisplayValueAPart',
        payload: data
      })
    },
    []
  )

  return {
    ...rootDc,
    hideGroup,
    __ext__: {
      setDcValue,
      setDcDisplayValue,
      setDcDisplayValueAPart,
      dispatchRootDc
    }
  }
}
