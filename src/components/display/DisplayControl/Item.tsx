import React, { useContext, useEffect, PropsWithChildren } from 'react';

import { DisplayControlContext } from './context';

type ItemProps = {
  id: string | number;
} & PropsWithChildren;
export const Item = ({ id, children }: ItemProps) => {
  const { mode, showingIds, addIdToIds, addIdToDuplicatedIds } = useContext(
    DisplayControlContext
  );
  const isShow = showingIds.includes(id);

  useEffect(() => {
    // check duplicated first
    addIdToDuplicatedIds(id);
    // then add to list ids later
    addIdToIds(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (mode === 'display' && !isShow) {
    return <span style={{ display: 'none' }}>{children}</span>;
  }

  if (mode === 'render' && !isShow) {
    return <></>;
  }

  return <>{children}</>;
};
