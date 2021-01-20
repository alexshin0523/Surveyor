import React, { Component } from 'react';

// REVIEW DISPLAY
// pass in the survey.id and access the survey by searching the surveys collection
// then create the data variable from survey and pass them in as props to <SurveyListItem /> to display the info
// OR
// pass in survey and data to display them by passing them in as props to <SurveyListItem />

// DELETE BUTTON
// the delete button in this review page will call an action function that POSTs to '/survey?' and update the document and redirect to '/surveys'

class SurveyDelete extends Component {
  render() {
    return(
      <div className="card" style={{ width: '75%', display: 'middle', padding: '5px' }}>
        <h5>Are you sure you would like to delete this survey?</h5>
      </div>
    );
  }
}

export default SurveyDelete;
