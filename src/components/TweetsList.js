import React from "react"

import { Link } from "react-router-dom"
import { connect } from "react-redux";

import Tweet from "./Tweet";

function mapStateToProps(state) {
    return { tweets: state.tweets };
};

const ConnectedTweetsList = ({ tweets }) =>
    <div >
        <ol>
            {tweets.map(t => <li key={t.id}><Tweet tweet={t}></Tweet></li>)}
        </ol>
        <Link className=" tweepita-button--primary " to="/Tweet">Tweet Something</Link>
    </div>
    ;

const TweetList = connect(mapStateToProps)(ConnectedTweetsList);

export default TweetList;