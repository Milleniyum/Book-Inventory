import React from 'react';

function Unknown({ unknowns, deleteUnknown }) {

    return (
        <React.Fragment>
            <h4>Unknowns</h4>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ISBN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {unknowns.map((unknown, index) => (
                        <tr key={unknown.id}>
                            <td>{unknowns.length - index}</td>
                            <td>{unknown.isbn}</td>
                            <td><button type="button" className="btn btn-danger" onClick={() => deleteUnknown(unknown.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>Books</h4>
        </React.Fragment>
    )
}

export default Unknown;
