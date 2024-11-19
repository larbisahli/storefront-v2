import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL } from '@dropgala/utils/utils'

const httpLink = new HttpLink({
  uri: `${apiURL}/storefront-graphql`
})

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: 5000,
    jitter: true
  },
  attempts: {
    max: 2,
    retryIf: (error, _operation) => {
      console.log(`retryIf`, {
        error,
        _operation,
        result: JSON.stringify(error.result.errors, null, 2)
      })
      return !isEmpty(error)
    }
  }
})

const apolloClient = new ApolloClient<NormalizedCacheObject>({
  link: from([retryLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false
  })
})

export default apolloClient
