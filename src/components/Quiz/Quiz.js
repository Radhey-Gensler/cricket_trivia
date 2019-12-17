import React, { Component } from "react";
import questionere from "../../Data/data";
import "./Quiz.css";
class Quiz extends Component {
  renderQuestions() {
    return questionere.quiz.map((quest, index) => {
      return <div key={index}>{quest.question}</div>;
    });
  }
  render() {
    return <React.Fragment>{this.renderQuestions()}</React.Fragment>;
  }
}

export default Quiz;
