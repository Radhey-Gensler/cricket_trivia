import React, { Component } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Quiz from "./components/Quiz/Quiz";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Quiz />
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;
