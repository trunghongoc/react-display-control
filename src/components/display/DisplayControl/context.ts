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

  addIdToIds: (_id: any) => {},
  addIdToDuplicatedIds: (_id: any) => {},

  hideItem: (_id: any) => {},
  hideItems: (_ids: any[]) => {},
  hideAll: () => {},

  showItem: (_id: any) => {},
  showOnlyItem: (_id: any) => {},
  showItems: (_ids: any[]) => {},
  showOnlyItems: (_ids: any[]) => {},
  showAll: () => {},

  initialShowList: [],
  initialHideList: [],
});
