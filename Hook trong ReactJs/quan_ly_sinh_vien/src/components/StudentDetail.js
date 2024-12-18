import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const StudentDetail = () => {
  const [student, setStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const foundStudent = students.find(s => s.id === parseInt(id));
    setStudent(foundStudent);
    setEditedStudent(foundStudent);
  }, [id]);

  const handleDelete = () => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const updatedStudents = students.filter(s => s.id !== parseInt(id));
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    toast.success('Sinh viên đã được xóa thành công!');
    navigate('/');
  };

  const handleUpdate = () => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const updatedStudents = students.map(s => 
      s.id === parseInt(id) ? { ...editedStudent, id: parseInt(id) } : s
    );
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudent(editedStudent);
    setShowEditModal(false);
    toast.success('Thông tin sinh viên đã được cập nhật!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prev => ({ ...prev, [name]: value }));
  };

  if (!student) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2 className="mb-0">Chi tiết Sinh viên</h2>
      </div>
      <div className="card-body">
        <p><strong>Họ và tên:</strong> {student.fullName}</p>
        <p><strong>Tuổi:</strong> {student.age}</p>
        <p><strong>Số điện thoại:</strong> {student.phone}</p>
        <p><strong>Địa chỉ:</strong> {student.address}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <div className="mt-3">
          <Link to="/" className="btn btn-primary me-2">Quay lại danh sách</Link>
          <Button variant="warning" onClick={() => setShowEditModal(true)} className="me-2">Sửa</Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Xóa</Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sinh viên <strong>{student.fullName}</strong> ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button variant="thirdary" onClick={handleDelete}>Xóa</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Student Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" name="fullName" value={editedStudent.fullName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tuổi</Form.Label>
              <Form.Control type="number" name="age" value={editedStudent.age} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" name="phone" value={editedStudent.phone} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="text" name="address" value={editedStudent.address} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={editedStudent.email} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Hủy</Button>
          <Button variant="primary" onClick={handleUpdate}>Lưu thay đổi</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentDetail;