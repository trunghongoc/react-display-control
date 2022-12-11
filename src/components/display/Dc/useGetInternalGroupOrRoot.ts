import { useContext } from 'react'
import { IdType } from './type'
import { RootContext } from './rootContext'

export const useGetInternalGroupOrRoot = (groupId?: IdType) => {
  const rootContext = useContext(RootContext)

  if (typeof groupId !== 'string' && typeof groupId !== 'number') {
    return rootContext
  }

  const result = groupId ? { ...rootContext.group[groupId] } : null || null
  return result
}
