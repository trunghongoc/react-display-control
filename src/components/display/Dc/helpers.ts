import { IGroupDisplayItems } from './type'

export const setAllAttrsToSameBool = (
  objOrBool: IGroupDisplayItems | boolean | undefined,
  value: boolean
): IGroupDisplayItems | boolean => {
  if (typeof objOrBool === 'object') {
    for (const key in objOrBool) {
      if (objOrBool.hasOwnProperty(key)) {
        ;(objOrBool as any)[key] = value
      }
    }

    return objOrBool
  }

  return value
}
