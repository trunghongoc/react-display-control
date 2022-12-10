import { useContext, useCallback } from 'react'
import { RootContext } from './rootContext'
import { setAllAttrsToSameBool } from './helpers'
import { IdType, IGroupDisplayItems, UseDisplayControlValue } from './type'

export const useDisplayControl = (groupId: IdType): UseDisplayControlValue => {
  const rootContext = useContext(RootContext)

  const setDisplay = useCallback(
    (dispayConfig: IGroupDisplayItems) => {
      rootContext.__ext__.setDcDisplayValueAPart({
        id: groupId,
        data: dispayConfig
      })
    },
    [groupId, rootContext]
  )

  const displaySameValue = useCallback(
    (value: boolean) => {
      const state = rootContext.group[groupId]
      const newState = setAllAttrsToSameBool(state, value)

      rootContext.__ext__.setDcDisplayValueAPart({
        id: groupId,
        data: newState
      })
    },
    [groupId, rootContext]
  )

  const displayAll = useCallback(() => {
    displaySameValue(true)
  }, [displaySameValue])

  const hideAll = useCallback(() => {
    displaySameValue(false)
  }, [displaySameValue])

  if (typeof groupId !== 'string' && typeof groupId !== 'number') {
    return null
  }

  if (!rootContext.group[groupId]) {
    return null
  }

  return {
    state: rootContext.group[groupId],
    setDisplay,
    displayAll,
    hideAll
  }
}
