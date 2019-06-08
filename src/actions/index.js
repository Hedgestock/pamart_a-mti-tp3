import { ADD_TWEET } from "./action-types";


export function addTweet(tweet) {
    return { type: ADD_TWEET, tweet }
};