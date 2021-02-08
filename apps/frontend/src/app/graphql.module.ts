import { environment } from '../environments/environment';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { createUploadLink } from 'apollo-upload-client';
import 'rxjs/add/operator/first';

import { ApolloLink } from '@apollo/client/link/core';
import { InMemoryCache } from '@apollo/client/cache';
import { AuthService } from './core/services';
import { generatedIntrospectionPangolin } from '@pangolin/graphql';
import { onError } from '@apollo/client/link/error';
const uri = environment.api_url;

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      AuthService.clearToken();
    }
  });
  const authLink = setContext(async (operation, { headers }) => {
    const token = await AuthService.getToken();
    return {
      ...headers,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const link = ApolloLink.from([
    basic,
    authLink,
    errorLink,
    createUploadLink({
      uri: uri,
    }),
  ]);

  const cache = new InMemoryCache({
    possibleTypes: generatedIntrospectionPangolin.possibleTypes,
  });
  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
