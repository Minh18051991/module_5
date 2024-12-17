import React, { useState } from 'react';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    age: '',
    phone: '',
    address: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (newStudent.fullName && newStudent.age && newStudent.phone && newStudent.address && newStudent.email) {
      setStudents(prevStudents => [...prevStudents, { ...newStudent, id: Date.now() }]);
      setNewStudent({ fullName: '', age: '', phone: '', address: '', email: '' });
    } else {
      alert('Vui lòng điền đầy đủ thông tin sinh viên!');
    }
  };

  const deleteStudent = (id) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sinh viên</h2>
      
      <form onSubmit={addStudent} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={newStudent.fullName}
              onChange={handleInputChange}
              placeholder="Họ và tên"
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              name="age"
              value={newStudent.age}
              onChange={handleInputChange}
              placeholder="Tuổi"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="address"
              value={newStudent.address}
              onChange={handleInputChange}
              placeholder="Địa chỉ"
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Thêm sinh viên</button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Họ và tên</th>
              <th>Tuổi</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.fullName}</td>
                <td>{student.age}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;