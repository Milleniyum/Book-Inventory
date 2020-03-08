import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import API from "./utils/API";
import moment from "moment";


class App extends Component {
  state = {
    books: [],
    isbn: "",
    authorized: true
  }

  componentDidMount() {
    this.isAuthorized();
    this.loadBooks();
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
        console.log(err)
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
          {this.state.authorized ? (
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
            </React.Fragment>
          ) : ("")}
          <table className="table table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{moment(book.published_date).format("M/D/YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
