import { ApiClient } from '../src';

const client = new ApiClient(process.env.APOLLO_KEY || 'YOUR-API-TOKEN');

client
  .autoabstract({
    headline: 'Apple increases App Store prices by 25% following Brexit vote',
    text: `<div> <p>Apple is raising prices on its UK App Store by almost 25% to reflect the sharp depreciation of the pound following June's vote to leave the European Union.</p> <p>The new prices enshrine parity between the dollar and the pound, at least for apps on the iOS and Mac app stores. An app that costs $0.99 in the US, and used to cost &#163;0.79, will now cost &#163;0.99.</p> <p><a href='https://www.theguardian.com/technology/apple'>Apple</a> announced the price rises in an email to app developers on Tuesday, and told them 'when foreign exchange rates or taxation changes, we sometimes need to update prices on the App Store'. It says the new prices will roll out over the next seven days, giving customers a short opportunity to beat the price increase.</p> <p>Similar price increases are expected to hit other Apple stores, including the iTunes Store for music and video and the iBooks Store.</p> <p>Britain isn't the only country experiencing price changes. India is seeing price increases due to changes in service taxes, while Turkish prices are also rising due to depreciation of the Turkish Lira. <br></p> <p>Since the vote to leave the European Union, the value of the pound has fallen by 18.5% against the US dollar. Apple has already acted to change other British prices since the vote to leave the European Union: in October, <a href='https://www.theguardian.com/technology/2016/oct/28/brexit-apple-mac-customers-prices-rise-us-dollar-pound-sterling'>it marked the launch of new Macs with a 20% price rise</a> across the line. One computer, the Mac Pro, saw its price jump by &#163;500 overnight.<br></p> <p>In a statement, Apple said: 'Price tiers on the App Store are set internationally on the basis of several factors, including currency exchange rates, business practices, taxes and the cost of doing business. These factors vary from region to region and over time.'</p> <p>The price rises were announced the same day <a href='https://www.theguardian.com/business/2017/jan/17/uk-inflation-hits-two-year-high'>UK inflation surged to 1.6%</a>, higher than expected. The Office of National Statistics said the increase was driven by rises in air fares and the price of food, along with prices for motor fuels.</p> Topics </div>`,
  })
  .then((result) => {
    console.group('ApolloAI - autoabstract result');
    console.dir(result);
    console.groupEnd();
  })
  .catch(console.error);
