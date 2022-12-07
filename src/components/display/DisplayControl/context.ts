import { createContext } from 'react';

import { DisplayControlContextValue } from './type';

export const DisplayControlContext = createContext<
  DisplayControlContextValue<any>
>({
  mode: 'render',
  ids: [],
  duplicatedIds: [],
  showingIds: [],
  hiddenIds: [],

  addIdToIds: (id: any) => {},
  addIdToDuplicatedIds: (id: any) => {},

  hideItem: (id: any) => {},
  hideItems: (ids: any[]) => {},
  hideAll: () => {},

  showItem: (id: any) => {},
  showOnlyItem: (id: any) => {},
  showItems: (ids: any[]) => {},
  showOnlyItems: (ids: any[]) => {},
  showAll: () => {},

  initialShowList: [],
  initialHideList: [],
});
