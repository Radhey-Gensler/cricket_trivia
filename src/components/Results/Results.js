import React, { Component } from "react";
import "./Results.css";
import BarChart from "../Chart/Chart";
class Results extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="results-holder">
          <button
            className="close-btn pull-right"
            onClick={this.props.closeResults}
          >
            X
          </button>
          <div className="results">
            <BarChart results={this.props.results} />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
