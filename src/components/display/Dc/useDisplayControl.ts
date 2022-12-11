import { useContext, useCallback, useEffect } from 'react'
import { RootContext } from './rootContext'
import { setAllAttrsToSameBool } from './helpers'
import { IdType, IGroupDisplayItems, UseDisplayControlValue } from './type'

export const useDisplayControl = (groupId: IdType): UseDisplayControlValue => {
  const rootContext = useContext(RootContext)
  const state: IGroupDisplayItems | boolean | undefined =
    rootContext.group[groupId]

  const getFormatedDisplayConfig = useCallback(
    (
      dispayConfig: IGroupDisplayItems | boolean
    ): IGroupDisplayItems | boolean => {
      if (typeof dispayConfig === 'object') {
        const formatedDisplayConfig: IGroupDisplayItems = {}

        for (const key in dispayConfig) {
          if (dispayConfig.hasOwnProperty(key)) {
            formatedDisplayConfig[key] = !!dispayConfig[key]
          }
        }

        return formatedDisplayConfig
      }

      return !!dispayConfig
    },
    []
  )

  const displaySameValue = useCallback(
    (value: boolean) => {
      const newState = setAllAttrsToSameBool(state, value)

      rootContext.__ext__.setGroupDcValueASlice({
        id: groupId,
        state: newState
      })
    },
    [groupId, rootContext, state]
  )

  const setDisplay = useCallback(
    (dispayConfig: IGroupDisplayItems | boolean) => {
      if (dispayConfig === null) {
        return
      }

      if (
        typeof dispayConfig !== 'boolean' &&
        typeof dispayConfig !== 'object'
      ) {
        return
      }

      if (typeof dispayConfig === 'boolean') {
        displaySameValue(dispayConfig)
        return
      }

      const formatedDisplayConfig: IGroupDisplayItems | boolean =
        getFormatedDisplayConfig(dispayConfig)

      rootContext.__ext__.setGroupDcValueASlice({
        id: groupId,
        state: formatedDisplayConfig
      })
    },
    [groupId, rootContext, getFormatedDisplayConfig, displaySameValue]
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

  if (
    !rootContext.group[groupId] &&
    typeof rootContext.group[groupId] !== 'boolean'
  ) {
    return null
  }

  return {
    state: rootContext.group[groupId],
    setDisplay,
    displayAll,
    hideAll
  }
}
