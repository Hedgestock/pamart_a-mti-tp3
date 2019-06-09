import React from "react"
import "./style/tweepita.css"

import { hot } from "react-hot-loader"
import { HashRouter, Route } from "react-router-dom"

import TweetList from "./components/TweetsList"
import TweetForm from "./components/TweetForm"
import TweetEdit from "./components/TweetEdit"

const App = () =>
    <HashRouter>
        <h1>Tweepita</h1>
        <Route exact path="/" component={TweetList} />
        <Route exact path="/Tweet" component={TweetForm} />
        <Route exact path="/Tweet/:id" component={TweetEdit} />
        <Route exact path="/" render={() => <br/>} />
    </HashRouter>;

export default hot(module)(App)