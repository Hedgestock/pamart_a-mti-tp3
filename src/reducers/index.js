import { ADD_TWEET } from "../actions/action-types";

const initialState = {
    tweets: [],
    nextId: 0,
};

function tweetReducer(state = initialState, action) {
    if (action.type === ADD_TWEET) {
        return Object.assign({}, state, {
            tweets: state.tweets.concat({
                title: action.tweet.title,
                content: action.tweet.content,
                author: action.tweet.author,
                id: state.nextId
            }),// can't do {...action.tweet, id: nextId} and dont' understand why. (It doesn't like the dot)
            nextId: state.nextId + 1,
        });
    }
    return state;
};

export default tweetReducer;