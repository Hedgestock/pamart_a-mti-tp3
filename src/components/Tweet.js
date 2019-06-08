import React from 'react'
import { connect } from "react-redux";
import { removeTweet } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        removeTweet: id => dispatch(removeTweet(id))
    }
}

const ConnectedTweet = (props) => <div className="fulguro-tweet">
    <span onClick={() => props.removeTweet(props.tweet.id)}>x</span>
    <h2>{props.tweet.title}</h2>
    <p>{props.tweet.content}</p>
    <p>@{props.tweet.author || "anonymous"}</p>
    <p>{props.tweet.id}</p>
</div>

const Tweet = connect(null, mapDispatchToProps)(ConnectedTweet);

export default Tweet;