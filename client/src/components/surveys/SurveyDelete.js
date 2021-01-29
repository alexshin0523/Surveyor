import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
// REVIEW DISPLAY
// pass in the survey.id and access the survey by searching the surveys collection
// then create the data variable from survey and pass them in as props to <SurveyListItem /> to display the info
// OR
// pass in survey and data to display them by passing them in as props to <SurveyListItem />

// DELETE BUTTON
// the delete button in this review page will call an action function that POSTs to '/survey?' and update the document and redirect to '/surveys'
const COLORS = ['#0088FE', '#FFBB28'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


class SurveyDelete extends Component {
  toDateString(date) {
    const dateStr = new Date(date).toLocaleDateString();
    if ( dateStr !== 'Invalid Date') {
      return dateStr;
    }
    return 'No Responses Yet';
  }

  render() {
    return(
      <React.Fragment>
        <h5>Are you sure you would like to delete this survey?</h5>
        <div className="card" style={{ 'backgroundColor': '#52658F'}} key={this.props.survey._id}>
          <div className="card-content white-text">
            <p className="right">
              Sent On: {this.toDateString(this.props.survey.dateSent)}
            </p>
            <span className="card-title">{this.props.survey.title}</span>
            <p>Subject: {this.props.survey.subject}</p>
            <p>Question: {this.props.survey.body}</p>
            <div className="card-action" style={{ 'paddingLeft': 0, 'paddingRight': 0, 'paddingBottom': 10 }}>
              <div style={{ 'content': '', 'display': 'flex', 'justifyContent': 'space-between'}}>
                <div style={{'display': 'inline-block'}}><p>Responses:</p></div>
                <div className="right" style={{'display': 'inline-block', 'float':'right' }}>
                  <p>
                    Last Response: {this.toDateString(this.props.survey.lastResponse)}
                  </p>
                </div>
              </div>
              <div style={{ 'marginLeft': '20%' }}>
                <PieChart width={350} height={200}>
                  <Pie
                    data={this.props.data}
                    cx={100}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {
                      this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Legend
                    align="right"
                    verticalAlign='middle'
                    height={13}
                    wrapperStyle={{
                      width: 100,
                      height: 25,
                      backgroundColor: "black"
                    }}
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.props.handleCloseModal}>Cancel</button>
        <button className="right" onClick={() => this.props.handleDeleteAndClose(this.props.survey)}>Delete</button>
      </React.Fragment>
    );
  }
}

export default SurveyDelete;
