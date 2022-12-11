import React, { PropsWithChildren, useEffect, useRef, useMemo } from 'react'
import { IdType, RenderMode } from './type'
import { defaultRenderMode } from './constants'
import { useGetInternalGroupOrRoot } from './useGetInternalGroupOrRoot'

interface IProps extends PropsWithChildren {
  id: IdType
  mode?: RenderMode
  initialDisplay?: boolean
}

export const ItemSingle = ({ id, mode, initialDisplay, children }: IProps) => {
  mode = mode || defaultRenderMode
  initialDisplay = typeof initialDisplay !== 'boolean' ? true : !!initialDisplay

  const groupRef = useRef(initialDisplay)

  const rootContext = useGetInternalGroupOrRoot()
  const groupContextState: boolean | undefined = rootContext.group[id]

  const isShow = useMemo(() => {
    if (typeof groupContextState !== 'boolean') {
      return true
    }

    if (groupContextState) {
      return true
    }

    return initialDisplay
  }, [groupContextState, initialDisplay])

  useEffect(() => {
    if (!groupContextState) {
      rootContext.__ext__.setGroupDcValue({
        id,
        dcType: 'singleItem',
        state: groupRef.current
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (mode === 'css' && !isShow) {
    return <span style={{ display: 'none' }}>{children}</span>
  }

  if (mode === 'render' && !isShow) {
    return <></>
  }

  return <>{children}</>
}
