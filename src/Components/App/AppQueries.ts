import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn
    }
  }
`;
