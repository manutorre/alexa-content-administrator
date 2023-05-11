import React, { Component } from "react";
import Entry from "./Sections/Entry";
import Category from "./Sections/Category";
import Checkout from "./Sections/checkout";
import ContentdWords from "./Sections/ContentWords";
import CategoryWords from "./Sections/CategoryWords";
import NewsStepper from "./Sections/Stepper/NewsStepper";
import "antd/dist/antd.css";
import "../App.css";
import axios from "axios";
import Chatbot from "./Sections/Chatbot/chatbot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "chatbot",
      user: "",
    };
  }

  changeSection(section) {
    this.setState({ section: section });
  }

  showAdmin() {
    const win = window.open("../contentAdmin/index.html", "_blank");
    //acceder con window.query("username")
    //win.username = this.state.user
    win.focus();
  }

  render() {
    switch (this.state.section) {
      case "checkout":
        return <Checkout />;
        break;
      case "chatbot": {
        return <Chatbot />;
        break;
      }
      case "stepper":
        return (
          <NewsStepper
            showAdmin={() => this.showAdmin()}
            changeSection={(section) => this.changeSection(section)}
          />
        );
        break;
      case "semantic":
        return (
          <Entry
            showAdmin={() => this.showAdmin()}
            changeSection={(section) => this.changeSection(section)}
          />
        );
        break;
      case "contentWords":
        return (
          <ContentdWords
            showAdmin={() => this.showAdmin()}
            changeSection={(section) => this.changeSection(section)}
          />
        );
        break;
      case "category":
        return (
          <Category
            showAdmin={() => this.showAdmin()}
            changeSection={(section) => this.changeSection(section)}
          />
        );
        break;
      case "categoryWords":
        return (
          <CategoryWords
            showAdmin={() => this.showAdmin()}
            changeSection={(section) => this.changeSection(section)}
          />
        );
        break;
      default:
        return (
          <Entry
            showAdmin={() => this.showAdmin()}
            changeSection={(section) => this.changeSection(section)}
          />
        );
        break;
    }
  }
}

export default App;

//this.state.array[this.state.value]
