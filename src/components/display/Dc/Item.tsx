import React, { PropsWithChildren, useEffect, useContext, useMemo } from 'react'
import { IdType, RenderMode } from './type'
import { defaultRenderMode } from './constants'
import { useGetInternalGroupOrRoot } from './useGetInternalGroupOrRoot'
import { GroupContext } from './groupContext'

interface IProps extends PropsWithChildren {
  id: IdType
  mode?: RenderMode
}

export const Item = ({ id, mode, children }: IProps) => {
  const groupContexForChildren = useContext(GroupContext)
  const groupContext: { [itemId: string | number]: boolean } | undefined =
    useGetInternalGroupOrRoot(groupContexForChildren.groupId)

  const currentMode = useMemo(() => {
    return mode || groupContexForChildren.defaultMode || defaultRenderMode
  }, [groupContexForChildren.defaultMode, mode])

  const isShow = useMemo(() => {
    if (!groupContext) {
      return true
    }

    // check item.id
    if (typeof groupContext[id] !== 'boolean') {
      return true
    }

    return groupContext[id]
  }, [groupContext, id])

  useEffect(() => {
    groupContexForChildren.addIdToIds(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (currentMode === 'css' && !isShow) {
    return <span style={{ display: 'none' }}>{children}</span>
  }

  if (currentMode === 'render' && !isShow) {
    return <></>
  }

  return <>{children}</>
}
