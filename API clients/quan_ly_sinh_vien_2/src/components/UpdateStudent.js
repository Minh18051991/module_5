import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classes, setClasses] = useState([]);
  const [validated, setValidated] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    classId: '',
    gender: ''
  });

  useEffect(() => {
    fetchClasses();
    fetchStudent();
  }, [id]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes. Please try again.');
    }
  };

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
      toast.error('Failed to fetch student data. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await axios.put(`http://localhost:3001/students/${id}`, student);
      toast.success('Student updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student. Please try again.');
    }
  };

  return (
    <Container>
      <h1 className="my-4">Update Student</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomName">
            <Form.Label>Họ và Tên</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomAge">
            <Form.Label>Tuổi</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter age"
              name="age"
              value={student.age}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid age.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={student.phone}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="validationCustomAddress">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            name="address"
            value={student.address}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide an address.
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomClass">
            <Form.Label>Lớp</Form.Label>
            <Form.Select
              required
              name="classId"
              value={student.classId}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a class.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomGender">
            <Form.Label>Giới Tính</Form.Label>
            <Form.Select
              required
              name="gender"
              value={student.gender}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a gender.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Update Student</Button>

        <Button  variant="secondary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateStudent;