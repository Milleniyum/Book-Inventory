import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import API from "./utils/API";
import Books from "./pages/books";
import Unknown from "./pages/unknown";


class App extends Component {
  state = {
    books: [],
    unknowns: [],
    isbn: "",
    authorized: true
  }

  componentDidMount() {
    this.isAuthorized();
    this.loadBooks();
    this.loadUnknowns();
  }

  isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        if (res.data.message) {
          this.setState({ authorized: true });
        } else {
          this.setState({ authorized: true });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ authorized: false });
      });
  };

  logout = () => {
    API.logout()
      .then(res => {
        console.log("logged out");
        this.isAuthorized();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getBookInfo = (ISBN) => {
    console.log("ISBN entered:" + ISBN)
    API.getBookInfo(ISBN)
      .then(res => {
        console.log(res.data)
        if (res.data.items[0].volumeInfo.title && res.data.items[0].volumeInfo.authors[0]) {
          let info = res.data.items[0].volumeInfo;
          let book = {
            isbn: ISBN,
            title: info.title,
            author: info.authors.join(";"),
            subtitle: info.subtitle,
            publisher: info.publisher,
            published_date: info.publishedDate,
            description: info.description,
            page_count: info.pageCount,
            category: info.categories ? info.categories.join(";") : null,
            image_link: info.imageLinks ? info.imageLinks.thumbnail : null
          }
          let audio = new Audio('page_turn.wav');
          audio.play();
          this.saveBook(book);
        }

      })
      .catch(err => {
        let audio = new Audio('error.wav');
        audio.play();
        console.log(err);
        this.saveUnknown(ISBN);
      })
    this.setState({ isbn: "" });
  }

  loadBooks = () => {
    API.loadBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  saveBook = (book) => {
    API.saveBook(book)
      .then(res => {
        this.loadBooks();
      })
      .catch(err => console.log(err));
  }

  saveUnknown = (ISBN) => {
    API.saveUnknown(ISBN)
    .then(res => {
      return this.loadUnknowns()
    })
    .catch(err => console.log(err));
  }

  loadUnknowns = () => {
    API.loadUnknowns()
    .then(res => this.setState({unknowns: res.data}))
    .catch(err => console.log(err));
  }

  deleteUnknown = (id) => {
    API.deleteUnknown(id)
    .then(res => this.loadUnknowns())
    .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (value.trim().length === 13) this.getBookInfo(value.trim());
  };

  render() {
    return (
      <React.Fragment>
        <Header backgroundImage="books_splash.jpg">
          <h1>Jamie's Book Collection</h1>
        </Header>
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/add">
                <React.Fragment>
                  <br />
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Book ISBN</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="isbn"
                      value={this.state.isbn}
                      onChange={this.handleInputChange} />
                  </div>
                  <br />
                  <Unknown unknowns={this.state.unknowns} deleteUnknown={this.deleteUnknown} />
                </React.Fragment>
              </Route>
            </Switch>
            <Books books={this.state.books} />
          </Router>
        </div>
      </React.Fragment>
    )
  }
}

export default App;