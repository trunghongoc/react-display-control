import React, { PropsWithChildren } from 'react'
import { RootContext } from './rootContext'
import { useCreateRootDc } from './useCreateRootDc'

interface IRootContextProps<IGroupsId> extends PropsWithChildren {
  // control: IRootDcValueWithContextExt<IGroupsId>
}
export const RootProvider = <IGroupsId extends any>({
  children
}: IRootContextProps<IGroupsId>) => {
  const control = useCreateRootDc()

  return <RootContext.Provider value={control}>{children}</RootContext.Provider>
}
