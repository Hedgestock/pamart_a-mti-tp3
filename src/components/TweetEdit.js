import React from "react";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { editTweet } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        editTweet: tweet => dispatch(editTweet(tweet))
    };
}

function mapStateToProps(state) {
    return { tweets: state.tweets }; //I'm not able to pass the id needed at that moment so I retrieve the whole list to filter later, gross IMO but here its only a few objects so let's say it's ok until I find the solution. inB4 probbly never.
};

class ConnectedTweetEdit extends React.Component {
    constructor(props) {
        super(props);
        const tweet = props.tweets.find(t => t.id === parseInt(this.props.match.params.id));//Dirty, I would put that in the state but the goal of that is to use as little local stat as possible ?
        this.state = {
            title: tweet.title,
            content: tweet.content,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        this.props.editTweet({ id: parseInt(this.props.match.params.id), title, content, edited: true, author: this.props.tweets.find(t => t.id === parseInt(this.props.match.params.id)).author });// I guess I could put that in the store but it's complicated and this works fine as long as I'm concerned.
        this.setState({ title: "", content: "" });
        this.props.history.push("/");
    }

    render() {
        const { title, content } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    placeholder="Title"
                    onChange={this.handleChange}
                />
                <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    id="content"
                    value={content}
                    placeholder="Type your thoughts"
                    onChange={this.handleChange}
                />
                <button type="submit" className=" tweepita-button--primary ">
                    Update
                </button>
            </form>
        );
    }
}

const TweetEdit = connect(mapStateToProps, mapDispatchToProps)(ConnectedTweetEdit);

export default withRouter(TweetEdit);