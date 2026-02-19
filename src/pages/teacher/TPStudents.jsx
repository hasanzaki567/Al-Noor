import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { teacherAPI } from '../../services/api';
import './TPStudents.css';

function TPStudents() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    course: 'Nazra',
    level: 'Beginner',
    classDays: [],
    classTime: '',
    sessionType: '1-on-1',
    monthlyFee: '',
    password: '',
    createAccount: false,
    notes: ''
  });

  useEffect(() => {
    fetchStudents();
    if (location.state?.openAdd) {
      setShowAddForm(true);
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await teacherAPI.getStudents();
      if (res.success) {
        setStudents(res.students);
      }
    } catch (error) {
      console.error('Fetch students error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', phone: '', age: '', course: 'Nazra',
      level: 'Beginner', classDays: [], classTime: '', sessionType: '1-on-1',
      monthlyFee: '', password: '', createAccount: false, notes: ''
    });
    setEditingStudent(null);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      classDays: prev.classDays.includes(day)
        ? prev.classDays.filter(d => d !== day)
        : [...prev.classDays, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Student name is required');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        monthlyFee: formData.monthlyFee ? parseFloat(formData.monthlyFee) : 0,
      };

      if (editingStudent) {
        const res = await teacherAPI.updateStudent(editingStudent._id, dataToSend);
        if (res.success) {
          setSuccess('Student updated successfully');
          fetchStudents();
          setShowAddForm(false);
          resetForm();
        }
      } else {
        const res = await teacherAPI.addStudent(dataToSend);
        if (res.success) {
          setSuccess(res.accountCreated
            ? `${formData.name} added with login account!`
            : `${formData.name} added successfully!`
          );
          fetchStudents();
          setShowAddForm(false);
          resetForm();
        }
      }
    } catch (error) {
      setError(error.message || 'Error saving student');
    }

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email || '',
      phone: student.phone || '',
      age: student.age || '',
      course: student.course || 'Nazra',
      level: student.level || 'Beginner',
      classDays: student.classDays || [],
      classTime: student.classTime || '',
      sessionType: student.sessionType || '1-on-1',
      monthlyFee: student.monthlyFee || '',
      password: '',
      createAccount: false,
      notes: student.notes || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this student?')) return;
    try {
      const res = await teacherAPI.deleteStudent(id);
      if (res.success) {
        setSuccess('Student removed');
        fetchStudents();
      }
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => setSuccess(''), 3000);
  };

  const handlePaymentToggle = async (student) => {
    const newStatus = student.paymentStatus === 'paid' ? 'pending' : 'paid';
    try {
      await teacherAPI.updateStudent(student._id, {
        paymentStatus: newStatus,
        lastPaymentDate: newStatus === 'paid' ? new Date() : student.lastPaymentDate
      });
      fetchStudents();
    } catch (error) {
      console.error('Payment update error:', error);
    }
  };

  // Filtered students
  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCourse = filterCourse === 'all' || s.course === filterCourse;
    return matchSearch && matchCourse;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const courses = ['Hifz', 'Nazra', 'Tajweed', 'Qaida', 'Tafseer', 'Arabic'];

  if (loading) {
    return (
      <div className="tps-loading">
        <div className="tps-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="tps-page">
      {/* Header */}
      <div className="tps-header">
        <div>
          <h1>Students</h1>
          <p>{students.length} total students</p>
        </div>
        <button className="tps-add-btn" onClick={() => { resetForm(); setShowAddForm(true); }}>
          <i className="fas fa-plus"></i> Add Student
        </button>
      </div>

      {/* Success / Error */}
      {success && <div className="tps-alert success"><i className="fas fa-check-circle"></i> {success}</div>}
      {error && !showAddForm && <div className="tps-alert error"><i className="fas fa-exclamation-circle"></i> {error}</div>}

      {/* Filters */}
      <div className="tps-filters">
        <div className="tps-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
          <option value="all">All Courses</option>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Students table */}
      <div className="tps-table-wrap">
        {filteredStudents.length > 0 ? (
          <table className="tps-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Schedule</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>
                    <div className="tps-student-cell">
                      <div className="tps-avatar">{student.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <span className="tps-student-name">{student.name}</span>
                        <span className="tps-student-email">{student.email || 'No email'}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="tps-course-badge">{student.course}</span>
                    <span className="tps-level">{student.level}</span>
                  </td>
                  <td>
                    <span className="tps-schedule-text">
                      {student.classDays?.length > 0
                        ? student.classDays.map(d => d.substring(0, 3)).join(', ')
                        : 'Not set'}
                    </span>
                    {student.classTime && <span className="tps-time">{student.classTime}</span>}
                  </td>
                  <td>
                    <span className="tps-fee">₹{student.monthlyFee || 0}/mo</span>
                  </td>
                  <td>
                    <button
                      className={`tps-payment-btn ${student.paymentStatus}`}
                      onClick={() => handlePaymentToggle(student)}
                    >
                      {student.paymentStatus}
                    </button>
                  </td>
                  <td>
                    <div className="tps-actions">
                      <button className="tps-action-btn edit" onClick={() => handleEdit(student)} title="Edit">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="tps-action-btn delete" onClick={() => handleDelete(student._id)} title="Remove">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="tps-empty">
            <i className="fas fa-user-graduate"></i>
            <h3>No students found</h3>
            <p>Add your first student to get started</p>
          </div>
        )}
      </div>

      {/* Add/Edit Student Modal */}
      {showAddForm && (
        <div className="tps-modal-overlay" onClick={() => { setShowAddForm(false); resetForm(); }}>
          <div className="tps-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tps-modal-header">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <button className="tps-close-btn" onClick={() => { setShowAddForm(false); resetForm(); }}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            {error && <div className="tps-alert error" style={{ margin: '0 0 16px' }}><i className="fas fa-exclamation-circle"></i> {error}</div>}

            <form onSubmit={handleSubmit} className="tps-form">
              {/* Personal Info */}
              <div className="tps-form-section">
                <h3><i className="fas fa-user"></i> Personal Information</h3>
                <div className="tps-form-grid">
                  <div className="tps-field">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Student's full name" required />
                  </div>
                  <div className="tps-field">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" min="3" max="100" />
                  </div>
                  <div className="tps-field">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@email.com" />
                  </div>
                  <div className="tps-field">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
                  </div>
                </div>
              </div>

              {/* Quran Course */}
              <div className="tps-form-section">
                <h3><i className="fas fa-quran"></i> Quran Course Details</h3>
                <div className="tps-form-grid">
                  <div className="tps-field">
                    <label>Course</label>
                    <select name="course" value={formData.course} onChange={handleChange}>
                      {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="tps-field">
                    <label>Level</label>
                    <select name="level" value={formData.level} onChange={handleChange}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="tps-field">
                    <label>Session Type</label>
                    <select name="sessionType" value={formData.sessionType} onChange={handleChange}>
                      <option value="1-on-1">1-on-1</option>
                      <option value="Group">Group</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="tps-form-section">
                <h3><i className="fas fa-clock"></i> Schedule & Timing</h3>
                <div className="tps-field">
                  <label>Class Days</label>
                  <div className="tps-days-grid">
                    {days.map(day => (
                      <button
                        key={day}
                        type="button"
                        className={`tps-day-btn ${formData.classDays.includes(day) ? 'active' : ''}`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="tps-field">
                  <label>Class Time</label>
                  <input type="time" name="classTime" value={formData.classTime} onChange={handleChange} />
                </div>
              </div>

              {/* Payment */}
              <div className="tps-form-section">
                <h3><i className="fas fa-money-bill-wave"></i> Payment</h3>
                <div className="tps-field">
                  <label>Monthly Fee (₹)</label>
                  <input type="number" name="monthlyFee" value={formData.monthlyFee} onChange={handleChange} placeholder="Monthly fee amount" min="0" />
                </div>
              </div>

              {/* Account Creation */}
              {!editingStudent && (
                <div className="tps-form-section">
                  <h3><i className="fas fa-key"></i> Student Login Account</h3>
                  <label className="tps-checkbox-label">
                    <input type="checkbox" name="createAccount" checked={formData.createAccount} onChange={handleChange} />
                    <span>Create login account for this student</span>
                  </label>
                  {formData.createAccount && (
                    <div className="tps-form-grid" style={{ marginTop: '12px' }}>
                      <div className="tps-field">
                        <label>Login Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@email.com" required />
                      </div>
                      <div className="tps-field">
                        <label>Password *</label>
                        <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="Create password" required />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              <div className="tps-form-section">
                <h3><i className="fas fa-sticky-note"></i> Notes</h3>
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any notes about the student..." rows="3"></textarea>
              </div>

              {/* Submit */}
              <div className="tps-form-actions">
                <button type="button" className="tps-cancel-btn" onClick={() => { setShowAddForm(false); resetForm(); }}>
                  Cancel
                </button>
                <button type="submit" className="tps-submit-btn">
                  <i className={`fas ${editingStudent ? 'fa-save' : 'fa-plus'}`}></i>
                  {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TPStudents;
