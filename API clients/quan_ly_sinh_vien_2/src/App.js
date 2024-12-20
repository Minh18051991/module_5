import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';

import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import StudentDetail from './components/StudentDetail';
import StudentList from './components/StudentList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
                {user && <Nav.Link as={Link} to="/add">Thêm sinh viên</Nav.Link>}
              </Nav>
              <Nav>
                {user ? (
                  <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="flex-grow-1 mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<StudentList />} />
              <Route path="/add" element={<AddStudent />} />
              <Route path="/edit/:id" element={<UpdateStudent />} />
              <Route path="/detail/:id" element={<StudentDetail />} />
            </Route>
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