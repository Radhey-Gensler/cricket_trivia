import React, { Component, lazy, Suspense } from "react";
import questionere from "../../Data/data";
import "./Quiz.css";
import SearchBoxCombo from "../SearchBoxCombo/SearchBoxCombo";
const Results = lazy(() => import("../Results/Results"));

const no_questions = questionere.quiz.length;
let refs = {
  question1: React.createRef(),
  question2: React.createRef(),
  question3: React.createRef(),
  question4: React.createRef()
};
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      selected: {},
      showResults: false,
      results: { correct: 0, incorrect: 0 },
      questions: {}
    };
    for (let i = 1; i <= no_questions; i++) {
      this.state.questions[`${i}`] = {
        touched: false,
        question_id: i,
        match: false
      };
    }
    questionere.quiz.map(quest => {
      this.state.selected[`${quest.question_id}`] = null;
    });
  }

  setDefaults = () => {
    this.setState(
      () => {
        let obj = {
          selected: {},
          showResults: false,
          results: { correct: 0, incorrect: 0 },
          questions: {},
          error: false
        };
        for (let i = 1; i <= no_questions; i++) {
          obj.questions[`${i}`] = {
            touched: false,
            question_id: i,
            match: false
          };
        }
        questionere.quiz.map(quest => {
          obj.selected[`${quest.question_id}`] = null;
        });
        return obj;
      },
      () => {
        console.log(this.state);
      }
    );
  };
  resetToDefaults = () => {
    this.setDefaults();
  };

  componentDidMount() {
    console.log(this.state);
  }

  updateAnswers = obj => {
    this.setState(prevState => {
      let s = {
        ...prevState
      };
      s.selected[`${obj.question_id}`] = obj.data;
      return s;
    });
    console.log(obj);
    let qid = obj.question_id,
      match = false;
    if (obj.data !== null) {
      //check for the answer
      questionere.quiz.map(q => {
        if (q.question_id === obj.question_id) {
          if (q.answer === obj.data.id) {
            match = true;
          }
        }
      });
      this.updateState(qid, true, match);
    } else {
      this.updateState(qid, false, false);
    }
    // update the question tracker
  };

  updateState(qid, touchFlag, matchFlag) {
    this.setState(
      prevState => {
        let updated_obj = {
          ...prevState
        };
        updated_obj.questions[`${qid}`] = {
          ...prevState[`${qid}`],
          touched: touchFlag,
          match: matchFlag
        };
        return updated_obj;
      },
      () => {
        console.log(this.state);
      }
    );
  }

  renderQuestions = () => {
    return questionere.quiz.map((quest, index) => {
      return (
        <div key={index} className="question-container">
          <div className="question" ref={refs[`question${index + 1}`]}>
            {quest.question}*
          </div>
          <div className="options-container">
            <SearchBoxCombo
              dataSource={quest.options}
              question_id={quest.question_id}
              allowClear="true"
              selectedItem={this.state.selected[`${quest.question_id}`]}
              onChange={this.updateAnswers}
              style={{ width: "170px" }}
            />
          </div>
        </div>
      );
    });
  };

  onSubmit = event => {
    this.validate();
  };
  onReset = event => {
    this.resetToDefaults();
    this.resetErrors();
  };
  resetErrors = () => {
    Object.keys(this.state.questions).map(key => {
      refs[`question${key}`].current.classList.remove("highlight-error");
    });
  };
  validate = () => {
    this.resetErrors();
    let validations = true,
      results = {
        correct: 0,
        incorrect: 0
      };
    Object.keys(this.state.questions).map(key => {
      let currQuestion = this.state.questions[key];
      if (!currQuestion.touched) {
        validations = false;
        this.setState({ error: true });
        refs[`question${currQuestion.question_id}`].current.classList.add(
          "highlight-error"
        );
      } else {
        if (currQuestion.match) {
          results.correct += 1;
        } else {
          results.incorrect += 1;
        }
      }
    });
    if (validations) {
      console.log("proceed furthur");
      console.log(results);
      this.showResults(results);
    }
  };

  showResults = results => {
    this.setState({
      results,
      showResults: true
    });
  };
  closeResults = () => {
    this.resetToDefaults();
  };

  render() {
    return (
      <React.Fragment>
        <div className="quiz-container">
          {this.state.error ? (
            <div className="error">All questions are mandatory</div>
          ) : null}
          {this.renderQuestions()}
          <div className="btn-container">
            <a className="btn btn-submit" href="#" onClick={this.onSubmit}>
              SUBMIT
            </a>
            <a className="btn btn-reset" href="#" onClick={this.onReset}>
              RESET
            </a>
          </div>
        </div>
        {this.state.showResults ? (
          <Suspense fallback={<div>Loading Results...</div>}>
            <Results
              closeResults={this.closeResults}
              results={this.state.results}
            />
          </Suspense>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Quiz;
