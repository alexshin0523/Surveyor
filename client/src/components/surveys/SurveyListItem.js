import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { deleteSurvey } from '../../actions';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import SurveyDelete from './SurveyDelete';

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

class SurveyListItem extends Component{
  constructor() {
    super();
    this.state = { modalIsOpen: false };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ modalIsOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalIsOpen: false });
  }

  handleDeleteAndClose = (survey) => {
    this.props.deleteSurvey(survey);
    this.handleCloseModal();
  }

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
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <SurveyDelete
            survey={this.props.survey}
            data={this.props.data}
            handleCloseModal={this.handleCloseModal}
            handleDeleteAndClose={this.handleDeleteAndClose}
          />
        </Modal>
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
              <div style={{ 'marginLeft': '20%', 'marginBottom': '3%' }}>
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
                <button className="right red darken-3 btn-flat white-text" onClick={this.handleOpenModal}>
                  Delete
                  <i className="material-icons right">delete</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { deleteSurvey })(SurveyListItem);
