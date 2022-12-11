import React, { PropsWithChildren } from 'react'
import { RootContext } from './rootContext'
import { useCreateRootDc } from './useCreateRootDc'

interface IRootContextProps extends PropsWithChildren {
  // control: IRootDcValueWithContextExt
}
export const RootProvider = ({ children }: IRootContextProps) => {
  const control = useCreateRootDc()

  return <RootContext.Provider value={control}>{children}</RootContext.Provider>
}
