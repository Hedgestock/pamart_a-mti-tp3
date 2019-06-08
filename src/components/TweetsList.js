import React from 'react'


import { connect } from "react-redux";

import Tweet from "./Tweet";

const mapStateToProps = state => {
  return { tweets: state.tweets };
};

const ConnectedTweetsList = ({ tweets }) => <ol>
    {tweets.map(t => <li key={t.id}><Tweet tweet={t}></Tweet></li>)}
</ol>;

const TweetList = connect(mapStateToProps)(ConnectedTweetsList);

export default TweetList;