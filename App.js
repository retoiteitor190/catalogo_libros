import React from "react";

import Amplify from "aws-amplify";

import awsconfig from "./src/aws-exports";

import { withAuthenticator } from "aws-amplify-react-native";

import MainNavigator from "./src/components/Navigator";

import { GlobalProvider } from "./src/Context/global/Global.context";

Amplify.configure(awsconfig);

 function App({authData}) {
   console.log({authData});
  return (
    <GlobalProvider>
      <MainNavigator/>
    </GlobalProvider>
  ); 
}

export default withAuthenticator(App);