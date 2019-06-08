import React from 'react'
import { hot } from 'react-hot-loader'

import TweetList from "./components/TweetsList"
import Form from "./components/TweetForm"

const App = () =>
    <div>
        <h1>Tweepita</h1>
        <TweetList />
        <Form/>
    </div>;

export default hot(module)(App)