import React, { Component } from "react";
import "./Results.css";
class Results extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="results-holder">
          <button className="close-btn pull-right" onClick={this.props.closeResults}>X</button>
          <div className="results">
          <div >
            <label>Correct</label>
            <span>{this.props.results.correct}</span>
          </div>
          <div>
            <label>Incorrect</label>
            <span>{this.props.results.incorrect}</span>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
