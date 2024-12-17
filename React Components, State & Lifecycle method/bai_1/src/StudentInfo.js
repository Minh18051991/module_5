import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class StudentInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                {id: 1, name: 'Nguyen Van A', age: 20, address: 'Ha Noi'},
                {id: 2, name: 'Tran Thi B', age: 21, address: 'Ho Chi Minh'},
                {id: 3, name: 'Le Van C', age: 19, address: 'Da Nang'},
                {id: 4, name: 'Pham Thi D', age: 22, address: 'Can Tho'},
                {id: 5, name: 'Nguyen Thi E', age: 23, address: 'HCM'},
            ]
        };
    }

    render() {
        return (
            <div className="container mt-4">
                <h1 className="mb-4">Danh sách sinh viên</h1>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentInfoComponent;