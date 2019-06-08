import React from "react";
import { connect } from "react-redux";
import { addTweet } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addTweet: tweet => dispatch(addTweet(tweet))
  };
}

class ConnectedTweetForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      author: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, content, author } = this.state;
    this.props.addTweet({ title, content, author });
    this.setState({ title: "", content: "" });
  }

  render() {
    const { title, content, author } = this.state;
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
          <input
            type="text"
            className="form-control"
            id="content"
            value={content}
            placeholder="Type your thoughts"
            onChange={this.handleChange}
          />
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            placeholder="Your name"
            onChange={this.handleChange}
          />
        <button type="submit" className="btn btn-success btn-lg">
          TWEET !
        </button>
      </form>
    );
  }
}

const TweetForm = connect(null, mapDispatchToProps)(ConnectedTweetForm);

export default TweetForm;