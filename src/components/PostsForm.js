import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class PostsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.post ? props.post.title : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      content: props.post ? props.post.content : '',
      calendarFocused: false,
      error: ''
    };
  };
  _onTitleChange = ev => {
    const title = ev.target.value;
    this.setState(() => ({ title }));
  };
  _onMainContentChange = ev => {
    const content = ev.target.value;
    this.setState(() => ({ content }));
  };
  _onCalendarFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  _onDateChange = date => this.setState(() => ({ createdAt: date }));
  _onFormSubmit = (ev) => {
    ev.preventDefault();

    if (!this.state.title || !this.state.content) {
      this.setState(() => ({ error: 'You have to provide content and title' }));
    } else {
      this.setState(() => ({ error: '' }));
      const post = {
        title: this.state.title,
        createdAt: this.state.createdAt.valueOf(),
        content: this.state.content
      }
      this.props.onSubmit(post);
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this._onFormSubmit}>
        { this.state.error && <p>{this.state.error}</p> }
        <input
          type="text"
          className="text-input"
          placeholder="Title"
          autoFocus
          value={this.state.title}
          onChange={this._onTitleChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this._onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this._onCalendarFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          placeholder="Provide your post content here"
          value={this.state.content}
          onChange={this._onMainContentChange}
        />
        <div>
          <button className="button">Save Post</button>
        </div>
      </form>
    );
  }
}

PostsForm.defaultProps = {
  post: {
    title: '',
    createdAt: moment().valueOf(),
    content: ''
  },
  onSubmit: () => { }
}

PostsForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    createdAt: PropTypes.number,
    content: PropTypes.string
  }),
  onSubmit: PropTypes.func
};

export default PostsForm;
