import React from 'react'

const Tweet = ({tweet}) => <div className="fulguro-tweet">
    <h2>{tweet.title}</h2>
    <p>{tweet.content}</p>
    <p>@{tweet.author || "anonymous"}</p>
</div>

export default Tweet;