import React, { Component } from "react";

import Schema from "./components/Schema";

import Header from "./components/Header";

import Question from "./components/Question";

import Section from "./components/Section.js";

import DatabaseInput from "./components/Database/Input";
import DatabaseOutput from "./components/Database/Output";

// import Alert from "./components/Alert";

import SQL from "sql.js";

import defaultDatabase from "./default.sqlite";

import { withStyles } from "material-ui/styles";

class QuestionError extends Error { }

const getXTables = (db, x) => {
  const getTables = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${x &&
      `LIMIT ${x}`}`
  );

  // Did we recieve any tables back?
  if (getTables[0].values.length > 0) {
    return getTables[0].values;
  }

  throw new Error(`No tables found in the database`);
};

const _questions = [
  {
    set: "Easy",
    question: "Display all the contents of {table}",
    answer: "SELECT * FROM {table}",
    func: (db) => {
      let [[table]] = getXTables(db, 1);
      
      if(!table) {
        throw new QuestionError('Cannot get two unique tables from the database');
      }

      return {
        'table': table
      };
    },
    completed: true
  },
  {
    set: "Easy",
    answer: "SELECT * FROM {table}",
    question: "Display all the {column1} and {column2} from {table}",
    func: (db) => {
      let [[table]] = getXTables(db, 1);

      return {
        'table': table,
        'column1': 'orange',
        'column2': 'apple',
      };
    },
  },
  {
    set: "Intermediate",
    func: (db) => {
      //let [[table]] = this.getXTables(1);

      return {
        'table': 'apple',
        'column': 'orange'
      };
    },
    answer: "SELECT * FROM {table}",
    question: "Display all the different %column% that exist in %table%"
  }
];

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
    overflow: "auto",
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
    alert: null,
    history: [],
    schema: null,
    openSidebar: false,

    activeQuestion: 0,
    activeSet: 0,
    setNames: null,
    questions: null,
    activeQuestionSet: null,
  };

  changeQuestion = number => {
    this.setState({ activeQuestion: number });
  };

  changeQuestionSet = set => {
    const { questions } = this.state;

    const activeQuestionSet = [...questions.filter(question => question.set === set)];
    const activeQuestion = 0;
    const activeSet = set;

    this.setState({ activeSet, activeQuestion, activeQuestionSet });
  }

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
  
        Object.keys(config).map(key => template = template.replace(new RegExp(`{${key}}`, "g"), config[key]))
  
        return template;      
      };
  
      const question = format(_question, config);
      const answer = format(_answer, config);
  
      const obj = { ..._obj, question, answer };
  
      return obj;
    } catch(QuestionError) {
      console.log(QuestionError)
    }
  };

  componentDidMount = async () => {
    await this.getDatabase();

    // Extract all the unique question sets
    const questionSetNames = [...new Set(_questions.map(question => question.set))];

    // The default active set until changed
    const activeSet = questionSetNames[0];

    const questions = _questions.map(question => this.buildQuestion(question));
    
    const activeQuestionSet = [...questions.filter(question => question.set === activeSet)];

    this.setState({ activeSet, questionSetNames, questions, activeQuestionSet });
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
      () => this.getAllTableNames()
    );
  };

  getDatabase = () => {
    const savedDatabase = localStorage.getItem("__testSQL_Database__");

    if (savedDatabase) {
      const typedArray = toBinArray(savedDatabase);

      this.loadDatabase(typedArray);

      return Promise.resolve();
    } else {
      return fetch(defaultDatabase)
        .then(response => response.arrayBuffer())
        .then(
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

  saveDatabase() {
    // Convert the current database (ArrayBuffer) to a binary string
    //const string = new Uint8Array().reduce((data, byte) => data + String.fromCharCode(byte), '');

    localStorage.setItem(
      "__testSQL_Database__",
      toBinString(this.state.database.export())
    );
  }

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

  runStatement = () => {
    // Run the current statement that is saved in the state
    this.runQuery(this.state.statement);
  };

  changeStatement = statement => {
    this.setState({ statement });
  };

  runQuery = sql => {
    try {
      const results = this.state.database.exec(sql);

      this.setState({
        results,
        history: [...this.state.history, sql]
      });

      // Only save the database if a query has altered the dataset
      if (this.state.database.getRowsModified(sql)) {
        this.getAllTableNames();

        this.saveDatabase();
      }

      // Remove the alert(s) if any
      this.setState({ alert: null });
    } catch (error) {
      this.setState({
        alert: {
          type: `danger`,
          message: error.message
        }
      });
    }
  };

  runTableQuery = tableName => {
    const sql = `SELECT * FROM ${tableName}`;

    return this.runQuery(sql);
  };

  toggleSidebar = open => {
    const action = open || !this.state.openSidebar;

    this.setState({ openSidebar: action });
  };

  restoreDatabase = () => {
    return this.loadDatabase(this.state.initalDatabase);
  };

  render() {
    const { classes } = this.props;


    const { 
      results, 
      schema, 
      openSidebar, 
      activeSet, 
      questionSetNames, 
      activeQuestion, 
      activeQuestionSet,
    } = this.state;

    return (
      <div className={classes.root}>
        <Header sidebarToggler={this.toggleSidebar} auth={false} />
        {schema && (
          <Schema
            schema={schema}
            open={openSidebar}
            sidebarHandler={this.toggleSidebar}
            clickHandler={this.runTableQuery}
            uploadHandler={this.loadDatabase}
            restoreHandler={this.restoreDatabase}
            downloadHandler={this.downloadDatabase}
          />
        )}

        <main className={classes.main}>
          <div className={classes.toolbar} />
          <section className={classes.mainSection}>
            {activeQuestionSet && (
              <Section title="Questions">
                <Question 
                  activeSet={activeSet}
                  questionSetNames={questionSetNames}
                  activeQuestion={activeQuestion}
                  activeQuestionSet={activeQuestionSet}
                  changeQuestionHandler={this.changeQuestion}
                  changeQuestionSetHandler={this.changeQuestionSet}
                />
              </Section>
            )}

            <Section title="Statement" gutters>
              <DatabaseInput submitHandler={this.runQuery} />
            </Section>

            {results &&
              results.map((result, i) => (
                <Section title="Results" key={i} gutters>
                  <DatabaseOutput
                    columns={result.columns}
                    values={result.values}
                  />
                </Section>
              ))}
          </section>
        </main>
      </div>
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
