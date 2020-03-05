# @apolloai/api-client

This is the official client for the [apollo.ai API](https://docs.apollo.ai). Currently, only the autoabstract and clustering endpoints are supported. Support the pdf segmentation endpoints is planned. 
There are also some yet undocumented/semi-official helper endpoints available like extraction, sanitation and continuous clustering.

To use this api, an API key is mandatory and [can be requested via our contact form](https://apollo.ai). 

## Installation

```
npm i @apolloai/api-client 
```

or

```
yarn add @apolloai/api-client 
```

## Importing with typescript

```
import { DefaultApiClient } from '@apolloai/api-client';
```

## Usage of the apollo.ai autoabstract api

```
  const apolloClient = new DefaultApiClient('your apollo API key');
  const result = await apolloClient.autoabstract({ headline, text, maxCharacters, keywords });
```
