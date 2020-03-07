import { DefaultApiClient } from '../src';

const client = new DefaultApiClient(process.env.APOLLO_KEY || 'YOUR-API-TOKEN');

client
  .extract({
    url: 'https://www.theguardian.com/technology/2017/jan/17/apple-ios-mac-app-store-prices-rise-25-per-cent-following-brexit',
  })
  .then((result) => {
    console.group('ApolloAI - extraction result');
    console.dir(result);
    console.groupEnd();
  })
  .catch(console.error);
