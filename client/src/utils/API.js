import axios from "axios";

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  availableUN: function (username) {
    return axios.get("/api/user/?username=" + username);
  },
  getBookInfo: function(ISBN) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + ISBN);
  },
  loadBooks: function() {
    return axios.get("/api/books");
  },
  saveBook: function(book) {
    return axios.post("/api/book", book);
  },
  saveUnknown: function(ISBN) {
    return axios.post("/api/unknown/" + ISBN);
  },
  loadUnknowns: function() {
    return axios.get("/api/unknowns");
  },
  deleteUnknown: function(id) {
    return axios.delete("/api/unknown/" + id);
  }
};
