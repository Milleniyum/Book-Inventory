import React from 'react';
import moment from "moment";

function Books({ books }) {

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Published</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book.id}>
                        <td>{books.length - index}</td>
                        <td><img src={book.image_link} /></td>
                        <td>{book.title}</td>
                        <td>{book.subtitle}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{moment(book.published_date).format("M/D/YYYY")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Books;
