import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  toDateString(date) {
    const dateStr = new Date(date).toLocaleDateString()
    if ( dateStr != 'Invalid Date') {
      return dateStr
    }
    return 'No Responses Yet'
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
          <div className="card cyan darken-3" key={survey._id}>
            <div className="card-content white-text">
              <p className="right">
                Sent On: {this.toDateString(survey.dateSent)}
              </p>
              <span className="card-title">{survey.title}</span>
              <p>Subject: {survey.subject}</p>
              <p>Question: {survey.body}</p>
              <p className="right">
                Last Response: {this.toDateString(survey.lastResponse)}
              </p>
              <div className="card-action">
                <a>Yes: {survey.yes}</a>
                <a>No: {survey.no}</a>
              </div>
            </div>
          </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h4>Surveys List</h4>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
