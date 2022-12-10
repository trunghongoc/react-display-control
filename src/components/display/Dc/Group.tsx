import React, { PropsWithChildren, useEffect, useRef, useCallback } from 'react'
import { IdType, RenderMode, IGroupDisplayItems } from './type'
import { defaultRenderMode } from './constants'
import { useGetInternalGroupOrRoot } from './useGetInternalGroupOrRoot'
import { GroupContext } from './groupContext'

interface IProps extends PropsWithChildren {
  id: IdType
  defaultMode?: RenderMode
  initialDisplay?: IGroupDisplayItems
}

export const Group = ({
  id,
  children,
  defaultMode,
  initialDisplay
}: IProps) => {
  defaultMode = defaultMode || defaultRenderMode
  initialDisplay = initialDisplay || {}

  const rootContext = useGetInternalGroupOrRoot()
  const groupContext = rootContext.group[id]
  const groupRef = useRef({
    ...initialDisplay
  })

  const addIdToIds = useCallback((id: IdType) => {
    let isShow: boolean = true
    // TODO

    const newId = (initialDisplay as {}).hasOwnProperty(id)
      ? {}
      : {
          [id]: isShow
        }

    groupRef.current = {
      ...groupRef.current,
      ...newId
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupContexForChildren = {
    groupId: id,
    defaultMode,
    addIdToIds
  }

  useEffect(() => {
    if (!groupContext) {
      rootContext.__ext__.setDcDisplayValue({
        id,
        data: groupRef.current
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <GroupContext.Provider value={groupContexForChildren}>
      {children}
    </GroupContext.Provider>
  )
}
