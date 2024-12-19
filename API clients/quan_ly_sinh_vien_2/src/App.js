import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import './App.css'; // Đảm bảo bạn có file này để thêm các styles tùy chỉnh

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Quản lý sinh viên</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                <Nav.Link as={Link} to="/add">Thêm sinh viên</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="flex-grow-1 mt-4">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<UpdateStudent />} />
            <Route path="/detail/:id" element={<StudentDetail />} />
          </Routes>
        </Container>

        <footer className="bg-dark text-light text-center py-3 mt-4">
          <Container>
            <p>&copy; 2023 Student Management System. All rights reserved.</p>
          </Container>
        </footer>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;