import React from "react"

import { Link } from "react-router-dom"
import { connect } from "react-redux";

import { removeTweet } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        removeTweet: id => dispatch(removeTweet(id))
    }
}

const ConnectedTweet = (props) => <div className="fulguro-tweet">
    <h2>{props.tweet.title} <span>@{props.tweet.author || "anonymous"}</span></h2>
    <p>{props.tweet.content} {props.tweet.edited ? <span>edited</span>: ""}</p> 
    <button className=" tweepita-button--primary " onClick={() => props.removeTweet(props.tweet.id)}>Delete</button>
    <Link className=" tweepita-button--primary " to={`/Tweet/${props.tweet.id}`}>Modify</Link>
</div>

const Tweet = connect(null, mapDispatchToProps)(ConnectedTweet);

export default Tweet;