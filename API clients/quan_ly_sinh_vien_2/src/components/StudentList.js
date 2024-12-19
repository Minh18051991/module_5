import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './StudentList.module.css';
import {Button, Col, Container, Form, InputGroup, Modal, Pagination, Row, Table} from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [studentsResponse, classesResponse] = await Promise.all([
                axios.get('http://localhost:3001/students'),
                axios.get('http://localhost:3001/classes')
            ]);
            setStudents(studentsResponse.data);
            setFilteredStudents(studentsResponse.data);
            setClasses(classesResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
            toast.error('Failed to fetch data');
            setLoading(false);
        }
    };

    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setShowDeleteModal(true);
    };

    const deleteStudent = async () => {
        if (studentToDelete) {
            try {
                await axios.delete(`http://localhost:3001/students/${studentToDelete.id}`);
                toast.success('Xóa thành công');
                await fetchData();
            } catch (error) {
                console.error('Error deleting student:', error);
                toast.error('Không thể xóa sinh viên. Vui lòng thử lại.');
            }
        }
        setShowDeleteModal(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClassFilter = (e) => {
        setSelectedClass(e.target.value);
    };

    const performSearch = () => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedClass === '' || student.classId.toString() === selectedClass)
        );
        setFilteredStudents(filtered);
        setCurrentPage(1);
    };

    const getClassName = (classId) => {
        const classObj = classes.find(c => c.id === classId);
        return classObj ? classObj.name : `Unknown (ID: ${classId})`;
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <Container className={styles.studentList}>
            <div>Loading...</div>
        </Container>;
    }

    if (error) {
        return <Container className={styles.studentList}>
            <div>{error}</div>
        </Container>;
    }

    return (
        <Container className={styles.studentList}>
            <Row className={styles.header}>
                <Col>
                    <h1>Danh sách sinh viên</h1>
                </Col>
            </Row>

            <Row className={styles.searchBar}>
                <Col md={4}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Tìm theo tên sinh viên"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <Form.Select value={selectedClass} onChange={handleClassFilter}>
                        <option value="">Tất cả các lớp</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Button onClick={performSearch}>Tìm kiếm</Button>
                </Col>
            </Row>

            <Table striped bordered hover className={`{styles.table} ${styles.fixedTable}`}>
                <thead>
                <tr>
                    <th>Họ và tên</th>
                    <th>Lớp</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentStudents.map(student => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{getClassName(student.classId)}</td>
                        <td className={styles.actionButtons}>
                            <Link to={`/detail/${student.id}`}>
                                <Button variant="info" size="sm">Chi tiết</Button>
                            </Link>
                            <Link to={`/edit/${student.id}`}>
                                <Button variant="warning" size="sm">Sửa</Button>
                            </Link>
                            <Button variant="danger" size="sm"
                                    onClick={() => handleDeleteClick(student)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Row className="mt-3">
  <Col>
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

      {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, i) => {
        const pageNumber = i + 1;
        if (
          pageNumber === 1 ||
          pageNumber === Math.ceil(filteredStudents.length / studentsPerPage) ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
          return <Pagination.Ellipsis key={pageNumber} />;
        }
        return null;
      })}

      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(filteredStudents.length / studentsPerPage)}
      />
      <Pagination.Last
        onClick={() => paginate(Math.ceil(filteredStudents.length / studentsPerPage))}
        disabled={currentPage === Math.ceil(filteredStudents.length / studentsPerPage)}
      />
    </Pagination>
  </Col>
</Row>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xóa học sinh {studentToDelete?.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteStudent}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentList;