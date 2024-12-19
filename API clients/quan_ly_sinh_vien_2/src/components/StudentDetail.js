import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const studentResponse = await axios.get(`http://localhost:3001/students/${id}`);
      setStudent(studentResponse.data);

      const classResponse = await axios.get(`http://localhost:3001/classes/${studentResponse.data.classId}`);
      setClassName(classResponse.data.name);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setError('Failed to fetch student details. Please try again later.');
      toast.error('Failed to fetch student details');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <Container className="mt-4">
      <h1>Student Details</h1>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Age:</strong> {student.age}</p>
              <p><strong>Class:</strong> {className}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
            </Col>
            <Col md={6}>
              <p><strong>Address:</strong> {student.address}</p>
              <p><strong>Phone:</strong> {student.phone}</p>
              <p><strong>Email:</strong> {student.email}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="mt-3">
        <Link to={`/edit/${student.id}`}>
          <Button variant="warning" className="me-2">Edit</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Back to List</Button>
        </Link>
      </div>
    </Container>
  );
};

export default StudentDetails;