import { ADD_TWEET, REMOVE_TWEET, EDIT_TWEET } from "../actions/action-types";

const initialState = {
    tweets: [],
    nextId: 0,
};

function replaceAt(array, index, value) { // Avoid mutation
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
}

function tweetReducer(state = initialState, action) {
    if (action.type === ADD_TWEET) {
        return Object.assign(
            {
                tweets: state.tweets.concat({
                    title: action.tweet.title,
                    content: action.tweet.content,
                    author: action.tweet.author,
                    id: state.nextId
                }),// can"t do {...action.tweet, id: nextId} and dont" understand why. (It doesn"t like the dot)
                nextId: state.nextId + 1,
                state,
            }
        );
    } else if (action.type === REMOVE_TWEET) {
        return Object.assign(
            {
                state,
                tweets: state.tweets.filter(t => t.id !== action.tweetId),
                nextId: state.nextId, //Can"t seem to be missing that somehow. I thought state would mix with it...
            });
    } else if (action.type === EDIT_TWEET) {
        return Object.assign(
            {
                state,
                tweets: replaceAt(state.tweets, state.tweets.findIndex(t => t.id === action.tweet.id), action.tweet),
                nextId: state.nextId,
            });
    }
    return state;
};

export default tweetReducer;