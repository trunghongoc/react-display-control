import { RootProvider } from './RootProvider'
import { useDisplayControl } from './useDisplayControl'
import { Group } from './Group'
import { Item } from './Item'
export type { UseDisplayControlValue } from './type'

const DisplayControlProvider = RootProvider
const DisplayControlGroup = Group
const DisplayControlItem = Item

export {
  DisplayControlProvider,
  useDisplayControl,
  Group,
  DisplayControlGroup,
  Item,
  DisplayControlItem
}
