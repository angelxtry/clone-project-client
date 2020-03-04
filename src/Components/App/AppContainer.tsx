import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from './AppQueries';

const AppContainer = (): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <div>{JSON.stringify(data)}</div>
  );
};

export default AppContainer;
