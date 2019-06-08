import { ADD_TWEET, REMOVE_TWEET } from "./action-types";


export function addTweet(tweet) {
    return { type: ADD_TWEET, tweet }
};

export function removeTweet(tweetId) {
    return { type: REMOVE_TWEET, tweetId }
};