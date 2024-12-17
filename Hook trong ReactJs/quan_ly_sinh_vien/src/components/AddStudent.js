import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Họ và tên là bắt buộc'),
  age: Yup.number().positive('Tuổi phải là số dương').integer('Tuổi phải là số nguyên').required('Tuổi là bắt buộc').max(100, 'Tuổi tối đa là 100') ,
  phone: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ').required('Số điện thoại là bắt buộc'),
  address: Yup.string().required('Địa chỉ là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});

const AddStudent = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const newStudent = { ...values, id: Date.now() };
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));
      setSubmitting(false);
      toast.success('Thêm sinh viên thành công!');
      navigate('/');
    }, 400);
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2 className="mb-0">Thêm Sinh viên</h2>
      </div>
      <div className="card-body">
        <Formik
          initialValues={{ fullName: '', age: '', phone: '', address: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Họ và tên</label>
                <Field type="text" name="fullName" className="form-control" />
                <ErrorMessage name="fullName" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">Tuổi</label>
                <Field type="number" name="age" className="form-control" />
                <ErrorMessage name="age" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Số điện thoại</label>
                <Field type="text" name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Địa chỉ</label>
                <Field type="text" name="address" className="form-control" />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Đang thêm...' : 'Thêm sinh viên'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStudent;