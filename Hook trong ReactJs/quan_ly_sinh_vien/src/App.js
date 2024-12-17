import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import StudentDetail from './components/StudentDetail';


function App() {
  return (

    <Router>
      <div className="d-flex flex-column min-vh-100 app-background">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">Quản lý Sinh viên</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link custom-nav-link" style={{color:'#ffffff',fontWeight:'bold'}}>Danh sách Sinh viên</Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link custom-nav-link" style={{color:'#ffffff',fontWeight:'bold'}}>Thêm Sinh viên</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route path="/" element={<StudentList />} />
              <Route path="/add" element={<AddStudent />} />
              <Route path="/student/:id" element={<StudentDetail />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-light py-3">
          <div className="container text-center">
            <p className="mb-0">&copy; 2023 Quản lý Sinh viên. All rights reserved.</p>
          </div>
        </footer>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;