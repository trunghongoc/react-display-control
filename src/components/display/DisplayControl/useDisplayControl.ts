import {
  useState,
  useMemo,
  useCallback,
  useReducer,
  useRef,
  Reducer,
} from 'react';

import { UseDisplayControlProps, UseDisplayControl } from './type';

interface IActionReducer {
  type: string;
  payload: any;
}
const controlReducer = <IdType extends unknown>(
  state: UseDisplayControl<IdType>,
  action: IActionReducer
) => {
  switch (action.type) {
    case 'ids': {
      return {
        ...state,
        ids: action.payload,
      };
    }

    case 'duplicatedIds': {
      return {
        ...state,
        duplicatedIds: action.payload,
      };
    }

    case 'initialShowList': {
      return {
        ...state,
        initialShowList: action.payload,
      };
    }

    case 'initialHideList': {
      return {
        ...state,
        initialHideList: action.payload,
      };
    }

    case 'showingIds': {
      return {
        ...state,
        showingIds: action.payload,
      };
    }

    case 'showAll': {
      return {
        ...state,
        showAll: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const useDisplayControl = <IdType extends unknown>({
  mode,
  initialShowList: _initialShowList,
  initialHideList: _initialHideList,
}: UseDisplayControlProps<IdType>): UseDisplayControl<IdType> => {
  const [ids, setIds] = useState<IdType[]>([]);
  const [, setduplicatedIds] = useState<IdType[]>([]); // duplicatedIds
  const [initialShowList] = useState<IdType[]>(_initialShowList || []);
  const [initialHideList] = useState<IdType[]>(_initialHideList || []);
  const [showingIds, setShowingIdsState] = useState<IdType[]>(initialShowList);

  const currentIdsRef = useRef<IdType[]>(ids);
  const currentShowingIdsRef = useRef<IdType[]>(showingIds);

  const hiddenIds: IdType[] = useMemo(() => {
    return ids.filter((id: IdType) => !showingIds.includes(id));
  }, [ids, showingIds]);

  const addIdToIds = useCallback((id: IdType) => {
    setIds((currentIds: IdType[]) => {
      if (!currentIds.includes(id)) {
        const newIds = [...currentIds, id];
        dispatchControl({
          type: 'ids',
          payload: newIds,
        });

        currentIdsRef.current = newIds;

        return newIds;
      }

      currentIdsRef.current = currentIds;
      return currentIds;
    });
  }, []);

  const addIdToDuplicatedIds = useCallback(
    (id: IdType) => {
      const isDuplicated = currentIdsRef.current.includes(id);

      setduplicatedIds((currentIds: IdType[]) => {
        if (!isDuplicated) {
          dispatchControl({
            type: 'duplicatedIds',
            payload: currentIds,
          });

          return currentIds;
        }

        // duplicated case, and array is not iclude current id
        if (!currentIds.includes(id)) {
          const newDuplicatedIds = [...currentIds, id];

          dispatchControl({
            type: 'duplicatedIds',
            payload: newDuplicatedIds,
          });

          return newDuplicatedIds;
        }

        return currentIds;
      });
    },
    [currentIdsRef]
  );

  const saveToRelatedDataWhenChangeShowingIds = useCallback(
    (newIds: IdType[]) => {
      dispatchControl({
        type: 'showingIds',
        payload: newIds,
      });

      currentShowingIdsRef.current = newIds;
    },
    []
  );

  const hideItem = useCallback(
    (id: IdType) => {
      setShowingIdsState((currentShowingIds: IdType[]) => {
        const newShowingIds = currentShowingIds.filter((s: IdType) => s !== id);
        saveToRelatedDataWhenChangeShowingIds(newShowingIds);
        return newShowingIds;
      });
    },
    [saveToRelatedDataWhenChangeShowingIds]
  );

  const hideItems = useCallback(
    (ids: IdType[]) => {
      setShowingIdsState((currentShowingIds: IdType[]) => {
        const newShowingIds: IdType[] = currentShowingIds.filter(
          (showingId: IdType) => !ids.includes(showingId)
        );

        saveToRelatedDataWhenChangeShowingIds(newShowingIds);

        return newShowingIds;
      });
    },
    [saveToRelatedDataWhenChangeShowingIds]
  );

  const hideAll = useCallback(() => {
    setShowingIdsState([]);
    saveToRelatedDataWhenChangeShowingIds([]);
  }, [saveToRelatedDataWhenChangeShowingIds]);

  const showItem = useCallback(
    (id: IdType) => {
      setShowingIdsState((currentShowingIds: IdType[]) => {
        const newShowingIds: IdType[] = currentShowingIds.includes(id)
          ? currentShowingIds
          : [...currentShowingIds, id];

        saveToRelatedDataWhenChangeShowingIds(newShowingIds);

        return newShowingIds;
      });
    },
    [saveToRelatedDataWhenChangeShowingIds]
  );

  const showOnlyItem = useCallback(
    (newId: IdType) => {
      setShowingIdsState([newId]);
      saveToRelatedDataWhenChangeShowingIds([newId]);
    },
    [saveToRelatedDataWhenChangeShowingIds]
  );

  const showItems = useCallback(
    (idList: IdType[]) => {
      setShowingIdsState((currentShowingIds: IdType[]) => {
        const newShowingIds: IdType[] = [...currentShowingIds];

        idList.forEach((id: IdType) => {
          if (!newShowingIds.includes(id)) {
            newShowingIds.push(id);
          }
        });

        saveToRelatedDataWhenChangeShowingIds(newShowingIds);

        return newShowingIds;
      });
    },
    [saveToRelatedDataWhenChangeShowingIds]
  );

  const showOnlyItems = useCallback(
    (idList: IdType[]) => {
      const uniqIds: IdType[] = [];
      idList.forEach((id: IdType) => {
        if (!uniqIds.includes(id)) {
          uniqIds.push(id);
        }
      });

      setShowingIdsState(uniqIds);
      saveToRelatedDataWhenChangeShowingIds(uniqIds);
    },
    [saveToRelatedDataWhenChangeShowingIds]
  );

  const showAll = useCallback(() => {
    showItems(currentIdsRef.current);
  }, [currentIdsRef, showItems]);

  const [control, dispatchControl] = useReducer<
    Reducer<UseDisplayControl<IdType>, any>
  >(controlReducer, {
    mode,
    ids,
    initialShowList,
    initialHideList,
    // duplicatedIds,
    showingIds,
    hiddenIds,

    hideItem,
    hideItems,
    hideAll,

    showItem,
    showOnlyItem,
    showItems,
    showOnlyItems,
    showAll,
    __e: {
      context: {
        addIdToIds,
        addIdToDuplicatedIds,
      },
    },
  });

  return control;
};
