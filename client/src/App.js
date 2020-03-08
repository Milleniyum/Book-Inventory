import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from "./components/Header";
import API from "./utils/API";


class App extends Component {
  state = {
    books: [],
    isbn: "",
    authorized: true
  }

  getBookInfo = (ISBN) => {
    console.log("ISBN entered:" + ISBN)
    API.getBookInfo(ISBN)
      .then(res => {
        console.log(res.data)

      })
      .catch(err => console.log(err))
    this.setState({ isbn: "" });
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
              <br/>
            </React.Fragment>
          ) : ("")}
          <table className="table table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
