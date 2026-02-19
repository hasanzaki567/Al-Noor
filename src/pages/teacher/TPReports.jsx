import { useState, useEffect } from 'react';
import { teacherAPI } from '../../services/api';
import './TPReports.css';

function TPReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReport();
  }, [selectedMonth, selectedYear]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await teacherAPI.getReports(selectedMonth, selectedYear);
      if (res.success) {
        setReport(res.report);
      }
    } catch (error) {
      console.error('Fetch report error:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (dir) => {
    let newMonth = selectedMonth + dir;
    let newYear = selectedYear;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) {
    return (
      <div className="tpr-loading">
        <div className="tpr-spinner"></div>
        <p>Generating report...</p>
      </div>
    );
  }

  return (
    <div className="tpr-page">
      {/* Header */}
      <div className="tpr-header">
        <div>
          <h1>Reports</h1>
          <p>Monthly attendance summaries</p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="tpr-month-nav">
        <button onClick={() => navigateMonth(-1)} className="tpr-nav-btn">
          <i className="fas fa-chevron-left"></i>
        </button>
        <span className="tpr-month-label">{months[selectedMonth]} {selectedYear}</span>
        <button onClick={() => navigateMonth(1)} className="tpr-nav-btn">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Overview Cards */}
      {report && (
        <>
          <div className="tpr-overview">
            <div className="tpr-ov-card">
              <div className="tpr-ov-icon" style={{ background: '#e0f7f5' }}>
                <i className="fas fa-users" style={{ color: '#14B8A6' }}></i>
              </div>
              <div>
                <span className="tpr-ov-value">{report.totalStudents}</span>
                <span className="tpr-ov-label">Total Students</span>
              </div>
            </div>

            <div className="tpr-ov-card">
              <div className="tpr-ov-icon" style={{ background: '#e0f7e9' }}>
                <i className="fas fa-check-circle" style={{ color: '#15803d' }}></i>
              </div>
              <div>
                <span className="tpr-ov-value">{report.overallAttendance}%</span>
                <span className="tpr-ov-label">Attendance Rate</span>
              </div>
            </div>

            <div className="tpr-ov-card">
              <div className="tpr-ov-icon" style={{ background: '#e0f7e9' }}>
                <i className="fas fa-calendar-check" style={{ color: '#15803d' }}></i>
              </div>
              <div>
                <span className="tpr-ov-value">{report.totalPresent}</span>
                <span className="tpr-ov-label">Total Present</span>
              </div>
            </div>

            <div className="tpr-ov-card">
              <div className="tpr-ov-icon" style={{ background: '#fee2e2' }}>
                <i className="fas fa-times-circle" style={{ color: '#dc2626' }}></i>
              </div>
              <div>
                <span className="tpr-ov-value">{report.totalAbsent}</span>
                <span className="tpr-ov-label">Total Absent</span>
              </div>
            </div>
          </div>

          {/* Student Reports Table */}
          <div className="tpr-table-section">
            <h2>Student-wise Report</h2>
            <div className="tpr-table-wrap">
              {report.studentReports && report.studentReports.length > 0 ? (
                <table className="tpr-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Late</th>
                      <th>Total</th>
                      <th>Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.studentReports.map((sr) => (
                      <tr key={sr.student._id}>
                        <td>
                          <div className="tpr-student-cell">
                            <div className="tpr-avatar">{sr.student.name.charAt(0).toUpperCase()}</div>
                            <span>{sr.student.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="tpr-course-badge">{sr.student.course}</span>
                        </td>
                        <td className="tpr-num present">{sr.attendance.present}</td>
                        <td className="tpr-num absent">{sr.attendance.absent}</td>
                        <td className="tpr-num late">{sr.attendance.late}</td>
                        <td className="tpr-num">{sr.attendance.total}</td>
                        <td>
                          <div className="tpr-percentage-cell">
                            <div className="tpr-progress-bar">
                              <div
                                className="tpr-progress-fill"
                                style={{
                                  width: `${sr.attendance.percentage}%`,
                                  background: sr.attendance.percentage >= 75 ? '#15803d' :
                                    sr.attendance.percentage >= 50 ? '#d97706' : '#dc2626'
                                }}
                              ></div>
                            </div>
                            <span className="tpr-percentage-text">{sr.attendance.percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="tpr-empty">
                  <i className="fas fa-chart-bar"></i>
                  <h3>No data for this month</h3>
                  <p>Start marking attendance to see reports here</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TPReports;
