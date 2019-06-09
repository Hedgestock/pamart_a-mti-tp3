import { ADD_TWEET, REMOVE_TWEET, EDIT_TWEET } from "./action-types";


export function addTweet(tweet) {
    return { type: ADD_TWEET, tweet };
};

export function removeTweet(tweetId) {
    return { type: REMOVE_TWEET, tweetId };
};

export function editTweet(tweet) {
    return { type: EDIT_TWEET, tweet };
};