import React from 'react';
import moment from "moment";

function Books({ books }) {

    return (
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
                {books.map((book, index) => (
                    <tr key={book.id}>
                        <td>{books.length - index}</td>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{moment(book.published_date).format("M/D/YYYY")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Books;
