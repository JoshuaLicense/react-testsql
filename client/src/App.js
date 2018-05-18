import React, { Component } from "react";

import Schema from "./components/Schema";

import Header from "./components/Header";

import Question from "./components/Question";
import Feedback from "./components/Feedback";

import Section from "./components/Section.js";

import DatabaseInput from "./components/Database/Input";
import DatabaseOutput from "./components/Database/Output";

import UserProvider from "./components/Auth/Provider";

import Layout from "./components/Layout";

// import Alert from "./components/Alert";

import SQL from "sql.js";

import checkAnswer, { IncorrectAnswer } from "./components/Question/answer"; // eslint-disable-line no-unused-vars

import api from "./utils/api";

import { withStyles } from "@material-ui/core/styles";
import UserContext from "./components/Auth/Context";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0 // So the Typography noWrap works
  },
  mainSection: {
    // minHeight of the toolbar is now constant so the below can work
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflow: "auto"
  },
  toolbar: theme.mixins.toolbar,
  heading: {
    fontWeight: 500
  },
  componentDivider: {
    marginBottom: theme.spacing.unit * 2
  },
  schemaButton: {
    position: "absolute",
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  }
});

class App extends Component {
  state = {
    database: null,
    initalDatabase: null,
    results: null,
    feedback: null,
    history: [],
    schema: null,
    openSidebar: false,

    activeQuestion: 0,
    activeSet: 0,
    setNames: null,
    questions: null,
    activeQuestionSet: null
  };

  changeFeedback = feedback => {
    this.setState({ feedback });
  };

  changeQuestion = number => {
    this.setState({ activeQuestion: number });
  };

  changeQuestionSet = set => {
    const { questions } = this.state;

    const activeQuestionSet = [
      ...questions.filter(question => question.set === set)
    ];
    const activeQuestion = 0;
    const activeSet = set;

    this.setState({ activeSet, activeQuestion, activeQuestionSet });
  };

  activeQuestion = () => {
    const { activeSet, activeQuestion } = this.state;

    return this.questions[activeSet][activeQuestion];
  };

  buildQuestion = _obj => {
    const { question: _question, answer: _answer, func: _func } = _obj;

    // Try running the question callable
    try {
      const config = _func(this.state.database);

      const format = (_template, config) => {
        let template = _template;

        Object.keys(config).map(
          key =>
            (template = template.replace(
              new RegExp(`{${key}}`, "g"),
              config[key]
            ))
        );

        return template;
      };

      const question = format(_question, config);
      const answer = format(_answer, config);

      const obj = { ..._obj, question, answer };

      return obj;
    } catch (Error) {
      // Mark as error'd question
      const obj = {
        ..._obj,
        question: `Error: ${Error.message}`,
        answer: null,
        error: true
      };

      return obj;
    }
  };

  loadQuestions = questions => {
    const questionSetNames = [
      ...new Set(questions.map(question => question.set))
    ];

    // The default active set until changed
    const activeSet = questionSetNames[0];

    // Save the built questions object to the clients localStorage to survive refresh
    localStorage.setItem("__testSQL_Questions__", JSON.stringify(questions));

    const activeQuestionSet = [
      ...questions.filter(question => question.set === activeSet)
    ];

    this.setState({
      activeSet,
      questionSetNames,
      questions,
      activeQuestionSet
    });
  };

  getQuestions = (forceRebuild = false) => {
    const cachedQuestions = localStorage.getItem("__testSQL_Questions__");

    if (forceRebuild || null === cachedQuestions) {
      import("./components/Question/questions.js").then(
        ({ default: _questions }) => {
          const questions = _questions.map(question =>
            this.buildQuestion(question)
          );

          this.loadQuestions(questions);
        }
      );
    } else {
      this.loadQuestions(JSON.parse(cachedQuestions));
    }
  };

  componentDidMount = async () => {
    await this.getDatabase();

    this.getQuestions();
  };

  loadDatabase = typedArray => {
    // Provide a confirmation dialog to warn the user of potential dataloss
    if (
      this.state.database !== null &&
      !window.confirm(
        "Are you sure you want to import a new database? This will overwrite your existing one."
      )
    ) {
      return;
    }

    const database = new SQL.Database(typedArray);

    this.setState(
      {
        database,
        initalDatabase: typedArray,
        results: null
      },
      () => {
        this.getAllTableNames();
        this.saveDatabase(this.state.database);
      }
    );
  };

  getDatabase = () => {
    const savedDatabase = localStorage.getItem("__testSQL_Database__");

    if (savedDatabase) {
      const typedArray = toBinArray(savedDatabase);

      this.loadDatabase(typedArray);

      return Promise.resolve();
    } else {
      return api.getDefaultDatabase().then(
        fileBuffer => {
          const typedArray = new Uint8Array(fileBuffer);

          this.loadDatabase(typedArray);
        },
        error => {
          this.setState({
            alert: {
              type: `danger`,
              message: error.message
            }
          });
        }
      );
    }
  };

  downloadDatabase = () => {
    const blob = new Blob([this.state.database.export()], {
      type: `application/x-sqlite-3`
    });

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "testSQL.sqlite";
    a.onclick = () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
    };
    a.click();
  };

  saveDatabase = database => {
    // Convert the current database (ArrayBuffer) to a binary string
    //const string = new Uint8Array().reduce((data, byte) => data + String.fromCharCode(byte), '');
    localStorage.setItem(
      "__testSQL_Database__",
      toBinString(database.export())
    );
  };

  getAllTableNames = () => {
    const sql =
      'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table" AND `tbl_name` NOT LIKE "__testSQL_Database_%"';

    // Destructure the response to get only the values (the real schema data)
    let [{ values: tableNames }] = this.state.database.exec(sql);

    // tableNames are returned as [[0] => "Tbl_name", [1] => "Tbl_name"]]
    const schema = tableNames.map(([tableName]) => {
      const count = this.state.database.exec(
        `SELECT COUNT(*) FROM ${tableName}`
      )[0].values[0];

      return {
        name: tableName,
        count
      };
    });

    // Now they are in the format ["tbl_name", "tbl_name_2", ]
    this.setState({ schema });
  };

  markActiveQuestionAsComplete() {
    const { questions, activeQuestionSet, activeQuestion } = this.state;

    // This will also alter the "parent" array of questions (pass-by-reference)
    activeQuestionSet[activeQuestion].completed = true;

    console.log(questions);

    // Resave the questions in the localstorage to save the object with the completed property as true
    localStorage.setItem("__testSQL_Questions__", JSON.stringify(questions));

    this.setState({ activeQuestionSet });
  }

  runQuery = sql => {
    const { database, activeQuestionSet, activeQuestion } = this.state;

    const time = () => performance.now();

    const tick = time();

    //for(let i = 0; i < 1000; ++i) {
    try {
      if (checkAnswer(database, sql, activeQuestionSet[activeQuestion])) {
        this.changeFeedback({ message: "Correct Answer" });

        this.markActiveQuestionAsComplete();
      }
    } catch (IncorrectAnswer) {
      this.changeFeedback({ message: IncorrectAnswer.message, error: true });
    }
    //}

    console.log(time() - tick);

    const tock = time();
    // Run the sql query
    this.run(sql);
    console.log(time() - tock);

    // Only save the database if a query has altered the dataset
    if (database.getRowsModified(sql)) {
      this.getAllTableNames();

      this.saveDatabase(database);
    }
  };

  run = sql => {
    const { history, database } = this.state;

    try {
      const results = database.exec(sql);

      this.setState({
        results,
        history: [...history, sql]
      });
    } catch (Error) {
      this.changeFeedback({ message: Error.message, error: true });
    }
  };

  runTableQuery = tableName => {
    const sql = `SELECT * FROM ${tableName}`;

    return this.run(sql);
  };

  toggleSidebar = open => {
    const action = open || !this.state.openSidebar;

    this.setState({ openSidebar: action });
  };

  restoreDatabase = () => {
    this.loadDatabase(this.state.initalDatabase);
  };

  uploadDatabase = async typedArray => {
    await this.loadDatabase(typedArray);

    // Force rebuild of questions
    this.getQuestions(true);

    this.saveDatabase(this.state.database);
  };

  render() {
    return (
      <UserProvider>
        <Layout />
      </UserProvider>
    );
  }
}

function toBinArray(str) {
  var l = str.length,
    arr = new Uint8Array(l);
  for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

function toBinString(arr) {
  return arr.reduce((data, byte) => data + String.fromCharCode(byte), "");
}

export default withStyles(styles)(App);
