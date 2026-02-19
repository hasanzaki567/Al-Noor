import { useState, useEffect } from 'react';
import { teacherAPI } from '../../services/api';
import './TPSchedule.css';

function TPSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState('all');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    courseType: 'General',
    day: 'Monday',
    startTime: '',
    endTime: '',
    sessionType: '1-on-1',
    studentId: '',
    notes: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const courseTypes = ['Hifz', 'Nazra', 'Tajweed', 'Qaida', 'Tafseer', 'Arabic', 'General'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [scheduleRes, studentsRes] = await Promise.all([
        teacherAPI.getSchedule(),
        teacherAPI.getStudents()
      ]);

      if (scheduleRes.success) setSchedule(scheduleRes.schedule);
      if (studentsRes.success) setStudents(studentsRes.students.filter(s => s.isActive));
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.startTime || !formData.endTime) {
      setError('Title, start time, and end time are required');
      return;
    }

    try {
      const res = await teacherAPI.addSchedule({
        ...formData,
        studentId: formData.studentId || null
      });
      if (res.success) {
        setSuccess('Class added to schedule!');
        fetchData();
        setShowAddForm(false);
        setFormData({
          title: '', courseType: 'General', day: 'Monday',
          startTime: '', endTime: '', sessionType: '1-on-1',
          studentId: '', notes: ''
        });
      }
    } catch (error) {
      setError(error.message || 'Error adding class');
    }
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this class from schedule?')) return;
    try {
      const res = await teacherAPI.deleteSchedule(id);
      if (res.success) {
        setSuccess('Class removed');
        fetchData();
      }
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => setSuccess(''), 3000);
  };

  // Group schedule by day
  const groupedSchedule = days.reduce((acc, day) => {
    acc[day] = schedule.filter(s => s.day === day);
    return acc;
  }, {});

  const filteredDays = selectedDay === 'all' ? days : [selectedDay];

  // Get today's day name
  const todayName = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="tpsc-loading">
        <div className="tpsc-spinner"></div>
        <p>Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="tpsc-page">
      {/* Header */}
      <div className="tpsc-header">
        <div>
          <h1>Schedule</h1>
          <p>Manage your weekly class schedule</p>
        </div>
        <button className="tpsc-add-btn" onClick={() => setShowAddForm(true)}>
          <i className="fas fa-plus"></i> Add Class
        </button>
      </div>

      {/* Alerts */}
      {success && <div className="tpsc-alert success"><i className="fas fa-check-circle"></i> {success}</div>}
      {error && !showAddForm && <div className="tpsc-alert error"><i className="fas fa-exclamation-circle"></i> {error}</div>}

      {/* Day Filter */}
      <div className="tpsc-day-tabs">
        <button
          className={`tpsc-day-tab ${selectedDay === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDay('all')}
        >
          All Days
        </button>
        {days.map(day => (
          <button
            key={day}
            className={`tpsc-day-tab ${selectedDay === day ? 'active' : ''} ${day === todayName ? 'today' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day.substring(0, 3)}
            {day === todayName && <span className="tpsc-today-dot"></span>}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="tpsc-schedule">
        {filteredDays.map(day => (
          <div key={day} className={`tpsc-day-section ${day === todayName ? 'is-today' : ''}`}>
            <div className="tpsc-day-header">
              <h3>{day}</h3>
              {day === todayName && <span className="tpsc-today-badge">Today</span>}
              <span className="tpsc-class-count">{groupedSchedule[day]?.length || 0} classes</span>
            </div>

            <div className="tpsc-classes">
              {groupedSchedule[day]?.length > 0 ? (
                groupedSchedule[day].map(cls => (
                  <div key={cls._id} className="tpsc-class-card">
                    <div className="tpsc-class-time-bar">
                      <span className="tpsc-time">{formatTime(cls.startTime)}</span>
                      <div className="tpsc-time-line"></div>
                      <span className="tpsc-time">{formatTime(cls.endTime)}</span>
                    </div>

                    <div className="tpsc-class-details">
                      <div className="tpsc-class-top">
                        <h4>{cls.title}</h4>
                        <div className="tpsc-class-tags">
                          <span className="tpsc-tag course">{cls.courseType}</span>
                          <span className="tpsc-tag session">{cls.sessionType}</span>
                        </div>
                      </div>

                      {cls.studentId && (
                        <div className="tpsc-class-student">
                          <i className="fas fa-user"></i>
                          <span>{cls.studentId.name}</span>
                        </div>
                      )}

                      {cls.notes && (
                        <p className="tpsc-class-notes">{cls.notes}</p>
                      )}
                    </div>

                    <button className="tpsc-delete-btn" onClick={() => handleDelete(cls._id)} title="Remove">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="tpsc-no-classes">
                  <p>No classes scheduled</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showAddForm && (
        <div className="tpsc-modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="tpsc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tpsc-modal-header">
              <h2>Add New Class</h2>
              <button className="tpsc-close-btn" onClick={() => setShowAddForm(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            {error && <div className="tpsc-alert error" style={{ margin: '0 24px 16px' }}><i className="fas fa-exclamation-circle"></i> {error}</div>}

            <form onSubmit={handleSubmit} className="tpsc-form">
              <div className="tpsc-form-grid">
                <div className="tpsc-field full">
                  <label>Class Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Hifz Session - Ahmad" required />
                </div>

                <div className="tpsc-field">
                  <label>Course Type</label>
                  <select name="courseType" value={formData.courseType} onChange={handleChange}>
                    {courseTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="tpsc-field">
                  <label>Day *</label>
                  <select name="day" value={formData.day} onChange={handleChange}>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="tpsc-field">
                  <label>Start Time *</label>
                  <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </div>

                <div className="tpsc-field">
                  <label>End Time *</label>
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </div>

                <div className="tpsc-field">
                  <label>Session Type</label>
                  <select name="sessionType" value={formData.sessionType} onChange={handleChange}>
                    <option value="1-on-1">1-on-1</option>
                    <option value="Group">Group</option>
                  </select>
                </div>

                <div className="tpsc-field">
                  <label>Student (optional)</label>
                  <select name="studentId" value={formData.studentId} onChange={handleChange}>
                    <option value="">No specific student</option>
                    {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>

                <div className="tpsc-field full">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any notes..." rows="2"></textarea>
                </div>
              </div>

              <div className="tpsc-form-actions">
                <button type="button" className="tpsc-cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit" className="tpsc-submit-btn">
                  <i className="fas fa-plus"></i> Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TPSchedule;
