import { useMemo, PropsWithChildren } from 'react'

import { Item } from './Item'
import { DisplayControlContext } from './context'
import { UseDisplayControl } from './type'

type DisplayControlType<IdType> = {
  control: UseDisplayControl<IdType>
} & PropsWithChildren
export const DisplayControl = <IdType extends unknown>({
  control,
  children
}: DisplayControlType<IdType>) => {
  const contextValue = useMemo(() => {
    const { __e, ...othersCommon } = control

    return {
      ...__e.context,
      ...othersCommon
    }
  }, [control])

  return (
    <DisplayControlContext.Provider value={contextValue}>
      <>{children}</>
    </DisplayControlContext.Provider>
  )
}

DisplayControl.Item = Item
