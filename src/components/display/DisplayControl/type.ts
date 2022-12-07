/** common */
export type ModeType = 'display' | 'render'
/** .common */

/** useDisplayControl */
export type UseDisplayControlProps<IdType extends unknown> = {
  mode: ModeType
  initialShowList?: IdType[]
  initialHideList?: IdType[]
}

export type UseDisplayControl<IdType extends any> = {
  ids: IdType[]
  duplicatedIds?: IdType[]
  showingIds: IdType[]
  hiddenIds: IdType[]

  hideItem: (id: IdType) => void
  hideItems: (ids: IdType[]) => void
  hideAll: () => void

  showItem: (id: IdType) => void
  showOnlyItem: (id: IdType) => void
  showItems: (ids: IdType[]) => void
  showOnlyItems: (ids: IdType[]) => void
  showAll: () => void

  __e: {
    context: DisplayControlContextValueOnlyDifferHooks<IdType>
  }
} & UseDisplayControlProps<IdType>

/** .useDisplayControl */

/** context */
export type DisplayControlContextValueOnlyDifferHooks<IdType extends unknown> =
  {
    addIdToIds: (id: IdType) => void
    addIdToDuplicatedIds: (id: IdType) => void
  }
export type DisplayControlContextValue<IdType extends unknown> =
  {} & DisplayControlContextValueOnlyDifferHooks<IdType> &
    Omit<UseDisplayControl<IdType>, '__e'>
/** .context */
