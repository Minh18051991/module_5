import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { sampleStudents } from '../data/sampleData';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents && storedStudents.length > 0) {
      setStudents(storedStudents);
      setFilteredStudents(storedStudents);
    } else {
      setStudents(sampleStudents);
      setFilteredStudents(sampleStudents);
      localStorage.setItem('students', JSON.stringify(sampleStudents));
    }
  }, []);

  const deleteStudent = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const handleSearch = () => {
    let result = students;

    if (nameSearch) {
      result = result.filter(student => 
        student.fullName.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }

    if (ageFrom && ageTo) {
      result = result.filter(student => 
        student.age >= parseInt(ageFrom) && student.age <= parseInt(ageTo)
      );
    }

    setFilteredStudents(result);
  };

  const resetSearch = () => {
    setNameSearch('');
    setAgeFrom('');
    setAgeTo('');
    setFilteredStudents(students);
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2 className="mb-0">Danh sách Sinh viên</h2>
      </div>
      <div className="card-body">
        <Form className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Tìm kiếm theo tên</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Nhập tên sinh viên" 
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tìm kiếm theo tuổi</Form.Label>
            <InputGroup>
              <Form.Control 
                type="number" 
                placeholder="Từ" 
                value={ageFrom}
                onChange={(e) => setAgeFrom(e.target.value)}
              />
              <Form.Control 
                type="number" 
                placeholder="Đến" 
                value={ageTo}
                onChange={(e) => setAgeTo(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Button variant="primary" onClick={handleSearch} className="me-2">Tìm kiếm</Button>
          <Button variant="secondary" onClick={resetSearch}>Đặt lại</Button>
        </Form>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.fullName}</td>
                  <td>
                    <NavLink style={{ textDecoration: 'none',color: 'red',fontWeight: 'bold' }}
                        to={`/student/${student.id}`}
                        className={({ isActive }) =>
                            isActive ? "btn btn-info btn-sm me-2 active" : "btn btn-info btn-sm me-2"
                        }
                    >
                      Chi tiết
                    </NavLink>
                    <Button style={{fontWeight: 'bolder' }} variant="danger" onClick={() => deleteStudent(student.id)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;