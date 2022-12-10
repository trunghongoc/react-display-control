import { useContext } from 'react'
import { RootContext } from './rootContext'

export const useGetInternalGroupOrRoot = <IGroupsId extends any>(
  groupId?: IGroupsId
) => {
  const rootContext = useContext(RootContext)

  if (typeof groupId !== 'string' && typeof groupId !== 'number') {
    return rootContext
  }

  const result = groupId ? { ...rootContext.group[groupId] } : null || null
  return result
}
