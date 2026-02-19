import { useState, useEffect } from 'react';
import { teacherAPI } from '../../services/api';
import './TPAttendance.css';

function TPAttendance() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [existingAttendance, setExistingAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      fetchAttendance();
    }
  }, [selectedDate, students]);

  const fetchStudents = async () => {
    try {
      const res = await teacherAPI.getStudents();
      if (res.success) {
        setStudents(res.students.filter(s => s.isActive));
      }
    } catch (error) {
      console.error('Fetch students error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await teacherAPI.getAttendance({ date: selectedDate });
      if (res.success) {
        setExistingAttendance(res.attendance);
        // Pre-fill attendance records
        const records = {};
        res.attendance.forEach(a => {
          records[a.studentId?._id || a.studentId] = {
            status: a.status,
            surahPracticed: a.surahPracticed || '',
            notes: a.notes || ''
          };
        });
        setAttendanceRecords(records);
      }
    } catch (error) {
      console.error('Fetch attendance error:', error);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
        surahPracticed: prev[studentId]?.surahPracticed || '',
        notes: prev[studentId]?.notes || ''
      }
    }));
  };

  const handleFieldChange = (studentId, field, value) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const markAllPresent = () => {
    const records = {};
    students.forEach(s => {
      records[s._id] = {
        status: 'present',
        surahPracticed: attendanceRecords[s._id]?.surahPracticed || '',
        notes: attendanceRecords[s._id]?.notes || ''
      };
    });
    setAttendanceRecords(records);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const records = Object.entries(attendanceRecords)
        .filter(([_, data]) => data.status)
        .map(([studentId, data]) => ({
          studentId,
          status: data.status,
          surahPracticed: data.surahPracticed || '',
          notes: data.notes || ''
        }));

      if (records.length === 0) {
        setError('Please mark attendance for at least one student');
        setSaving(false);
        return;
      }

      const res = await teacherAPI.markBulkAttendance(selectedDate, records);
      if (res.success) {
        setSuccess(`Attendance saved for ${records.length} student(s)`);
        fetchAttendance();
      }
    } catch (error) {
      setError(error.message || 'Error saving attendance');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const markedCount = Object.values(attendanceRecords).filter(r => r.status).length;
  const presentCount = Object.values(attendanceRecords).filter(r => r.status === 'present').length;
  const absentCount = Object.values(attendanceRecords).filter(r => r.status === 'absent').length;

  if (loading) {
    return (
      <div className="tpa-loading">
        <div className="tpa-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="tpa-page">
      {/* Header */}
      <div className="tpa-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark daily attendance for your students</p>
        </div>
      </div>

      {/* Date & Stats Bar */}
      <div className="tpa-toolbar">
        <div className="tpa-date-picker">
          <i className="fas fa-calendar-alt"></i>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="tpa-stats-bar">
          <span className="tpa-stat present">
            <i className="fas fa-check-circle"></i> {presentCount} Present
          </span>
          <span className="tpa-stat absent">
            <i className="fas fa-times-circle"></i> {absentCount} Absent
          </span>
          <span className="tpa-stat total">
            <i className="fas fa-users"></i> {markedCount}/{students.length} Marked
          </span>
        </div>

        <div className="tpa-toolbar-actions">
          <button className="tpa-mark-all-btn" onClick={markAllPresent}>
            <i className="fas fa-check-double"></i> Mark All Present
          </button>
          <button className="tpa-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? (
              <><span className="tpa-btn-spinner"></span> Saving...</>
            ) : (
              <><i className="fas fa-save"></i> Save Attendance</>
            )}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {success && <div className="tpa-alert success"><i className="fas fa-check-circle"></i> {success}</div>}
      {error && <div className="tpa-alert error"><i className="fas fa-exclamation-circle"></i> {error}</div>}

      {/* Attendance Grid */}
      <div className="tpa-grid">
        {students.length > 0 ? (
          students.map((student) => {
            const record = attendanceRecords[student._id] || {};
            return (
              <div key={student._id} className={`tpa-card ${record.status || ''}`}>
                <div className="tpa-card-top">
                  <div className="tpa-student-info">
                    <div className="tpa-avatar">{student.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <span className="tpa-student-name">{student.name}</span>
                      <span className="tpa-student-course">{student.course} • {student.level}</span>
                    </div>
                  </div>
                </div>

                {/* Status buttons */}
                <div className="tpa-status-btns">
                  {['present', 'absent', 'late', 'excused'].map(status => (
                    <button
                      key={status}
                      className={`tpa-status-btn ${status} ${record.status === status ? 'active' : ''}`}
                      onClick={() => handleStatusChange(student._id, status)}
                    >
                      <i className={`fas ${
                        status === 'present' ? 'fa-check' :
                        status === 'absent' ? 'fa-times' :
                        status === 'late' ? 'fa-clock' : 'fa-hand-paper'
                      }`}></i>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Surah practiced */}
                {record.status && (
                  <div className="tpa-card-extras">
                    <input
                      type="text"
                      placeholder="Surah practiced today..."
                      value={record.surahPracticed || ''}
                      onChange={(e) => handleFieldChange(student._id, 'surahPracticed', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Add a note..."
                      value={record.notes || ''}
                      onChange={(e) => handleFieldChange(student._id, 'notes', e.target.value)}
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="tpa-empty">
            <i className="fas fa-user-graduate"></i>
            <h3>No students yet</h3>
            <p>Add students first to mark attendance</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TPAttendance;
