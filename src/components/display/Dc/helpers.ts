import { IGroupDisplayItems } from './type'

export const setAllAttrsToSameBool = (
  obj: IGroupDisplayItems,
  value: boolean
): IGroupDisplayItems => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      ;(obj as any)[key] = value
    }
  }

  return obj
}
