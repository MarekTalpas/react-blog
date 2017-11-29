import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setTextFilter,
  setStartDateFilter,
  setEndDateFilter,
  sortByDate,
  sortByTitle
} from '../actions/filters';

export class PostsListFilters extends Component {
  state = {
    calendarFocused: null
  };
  _onCalendarFocusChange = calendarFocused => this.setState({ calendarFocused });
  _onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDateFilter(startDate);
    this.props.setEndDateFilter(endDate);
  };
  _onInputChange = (ev) => {
    this.props.setTextFilter(ev.target.value);
  };
  _onSortChange = (ev) => {
    if (ev.target.value === 'date') {
      this.props.sortByDate();
    } else if (ev.target.value === 'title') {
      this.props.sortByTitle();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              type="text"
              placeholder="Search Posts"
              value={this.props.filters.text}
              onChange={this._onInputChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              onChange={this._onSortChange}
              value={this.props.filters.sortBy}
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this._onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this._onCalendarFocusChange}
              numberOfMonths={1}
              showClearDates={true}
              isOutsideRange={() => false}
            />
          </div>
          <div className="page-header__actions">
            <Link className="button"to="/create">Add Post</Link>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setStartDateFilter: (startDate) => dispatch(setStartDateFilter),
  setEndDateFilter: (endDate) => dispatch(setEndDateFilter),
  sortByDate: () => dispatch(sortByDate()),
  sortByTitle: () => dispatch(sortByTitle())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListFilters);