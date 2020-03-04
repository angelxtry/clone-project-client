/* eslint-disable no-shadow */
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
  resolvers: {
    Mutation: {
      logUserIn: (_: any, { jwt }: { jwt: string }, { cache }): null => {
        localStorage.setItem('jwt', jwt);
        cache.writeData({
          data: {
            __typename: 'Auth',
            isLoggedIn: true,
          },
        });
        return null;
      },
      logUserOut: (_: any, __: any, { cache }): null => {
        localStorage.removeItem('jwt');
        cache.writeData({
          data: {
            __typename: 'Auth',
            isLoggedIn: false,
          },
        });
        return null;
      },
    },
  },
});
cache.writeData({
  data: {
    auth: {
      __typename: 'Auth',
      isLoggedIn: Boolean(localStorage.getItem('jwt')),
    },
  },
});
// const client = new ApolloClient({
//   clientState: {
//     defaults: {
//       auth: {
//         __typename: 'Auth',
//         isLoggedIn: Boolean(localStorage.getItem('jwt')),
//       },
//       resolvers: {
//         Mutation: {
//           logUserIn: (
//             _: any,
//             { jwt }: { jwt: string },
//             { cache }: { cache: any },
//           ): null => {
//             localStorage.setItem('jwt', jwt);
//             cache.writeData({
//               data: {
//                 __typename: 'Auth',
//                 isLoggedIn: true,
//               },
//             });
//             return null;
//           },
//           logUserOut: (_: any, __: any, { cache }: { cache: any }): null => {
//             localStorage.removeItem('jwt');
//             cache.writeData({
//               data: {
//                 __typename: 'Auth',
//                 isLoggedIn: false,
//               },
//             });
//             return null;
//           },
//         },
//       },
//     },
//   },
//   request: async (operation: Operation): Promise<void> => {
//     operation.setContext({
//       headers: {
//         'X-JWT': localStorage.getItem('jwt') || '',
//       },
//     });
//   },
//   uri: 'http://localhost:5000/graphql',
// });

export default client;
