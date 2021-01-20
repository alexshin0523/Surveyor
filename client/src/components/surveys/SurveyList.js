import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import SurveyListItem from './SurveyListItem';

class SurveyList extends Component {
  // state = { onDelete: false };
  //
  // deleteSurvey = (survey) => {
  //   survey.updateOne({ isDeleted: true });
  //   this.setState({
  //     onDelete: true
  //   });
  //   console.log(survey.isDeleted)
  // }

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      const data = [
        { name: 'Yes', value: survey.yes },
        { name: 'No', value: survey.no }
      ];
      return (<SurveyListItem data={data} survey={survey} />);
    });
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
