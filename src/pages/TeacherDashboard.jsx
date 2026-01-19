import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import usePageTitle from "../hooks/usePageTitle";
import './TeacherDashboard.css';

function TeacherDashboard() {
  usePageTitle("Teacher Portal");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get user data
  const userData = JSON.parse(localStorage.getItem('user')) || { 
    name: 'Teacher', 
    email: 'teacher@email.com',
    type: 'teacher'
  };

  // Format name for display
  const displayName = userData.name ? 
    userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'Teacher';

  // Demo data for today's classes
  const todaysClasses = [
    {
      id: 1,
      type: 'Hifz',
      studentName: 'Ahmad Khan',
      time: '4:00 PM',
      sessionType: '1-on-1',
      avatar: '/student1.webp',
      isLive: true
    },
    {
      id: 2,
      type: 'Tajweed',
      studentName: null,
      time: '5:00 PM',
      sessionType: 'Group',
      avatar: '/group.webp',
      isLive: false
    },
    {
      id: 3,
      type: 'Nazra',
      studentName: 'Ayesha Rahman',
      time: '6:00 PM',
      sessionType: '1-on-1',
      avatar: '/student2.webp',
      isLive: false
    }
  ];

  // Demo data for students
  const myStudents = [
    {
      id: 1,
      name: 'Ahmad Khan',
      avatar: '/student1.webp',
      surah: 'Soura read Al-Mulk (50/80 Ayahs)',
      course: 'Hifz - Level 2',
      courseColor: '#1A9B8E',
      progress: 'Tajweed comment: 223 comments'
    },
    {
      id: 2,
      name: 'Ayesha Rahman',
      avatar: '/student2.webp',
      surah: 'Completed up to Soura Al-Ikhlas',
      course: 'Nazra - Beginner',
      courseColor: '#C9A961',
      progress: 'Tajweed - Practice'
    }
  ];

  // Quick actions data
  const quickActions = [
    { id: 1, icon: 'fas fa-clipboard-check', label: 'Mark Attendance', color: '#1A9B8E' },
    { id: 2, icon: 'fas fa-book', label: 'Assign Homework', color: '#1A9B8E' },
    { id: 3, icon: 'fas fa-sticky-note', label: 'Add Notes', color: '#1A9B8E' },
    { id: 4, icon: 'fas fa-comment-dots', label: 'Message Parent', color: '#1A9B8E' }
  ];

  // Sidebar quick actions
  const sidebarQuickActions = [
    { id: 1, icon: 'fas fa-clipboard-check', label: 'Mark Attendance' },
    { id: 2, icon: 'fas fa-book', label: 'Assign Homework' },
    { id: 3, icon: 'fas fa-plus-circle', label: 'Add next practice' },
    { id: 4, icon: 'fas fa-user-plus', label: 'Nazra - Beginner', hasAlert: true }
  ];

  // Recent notes
  const recentNotes = [
    {
      id: 1,
      student: 'Azepa - 23',
      note: 'Ahmad has made considerable progress in his Hifz, but needs revision on last 10 ayams.',
      icon: 'fas fa-quran'
    },
    {
      id: 2,
      student: 'Ayeno - 23',
      note: 'Ayesha practiced Tajweed rules, but focus on Madd o.',
      icon: 'fas fa-quran'
    }
  ];

  // Calendar logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const today = new Date();
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                         currentMonth.getFullYear() === today.getFullYear();

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const adjustedStartDay = startingDay === 0 ? 6 : startingDay - 1;
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(<span key={`empty-${i}`} className="calendar-day empty"></span>);
    }
    
    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      days.push(
        <span 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''}`}
        >
          {day}
        </span>
      );
    }
    
    return days;
  };

  return (
    <div className="teacher-dashboard">
      {/* Decorative Background */}
      <div className="td-bg-decoration">
        <div className="td-leaf td-leaf-1"></div>
        <div className="td-leaf td-leaf-2"></div>
        <div className="td-leaf td-leaf-3"></div>
      </div>

      {/* Main Container */}
      <div className="td-container">
        {/* Header */}
        <header className="td-header">
          <div className="td-header-left">
            <span className="td-portal-label">
              Teacher Portal <span className="td-sparkle">✦</span>
            </span>
            <h1 className="td-greeting">
              Assalamu Alaikum, Ustadh {displayName}
            </h1>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="td-main-grid">
          {/* Left Column */}
          <div className="td-left-column">
            {/* Today's Classes Card */}
            <div className="td-card td-classes-card">
              <div className="td-card-header">
                <h2 className="td-card-title">
                  Today's Classes
                </h2>
                <div className="td-card-actions">
                  <button className="td-nav-btn">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="td-nav-btn">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <Link to="/scheduler" className="td-view-all">
                    View All <span className="td-sparkle">✦</span>
                  </Link>
                </div>
              </div>

              <div className="td-classes-list">
                {todaysClasses.map((classItem) => (
                  <div key={classItem.id} className="td-class-item">
                    <div className="td-class-avatar">
                      <img 
                        src={classItem.avatar} 
                        alt={classItem.studentName || classItem.type}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(classItem.studentName || classItem.type)}&background=1A9B8E&color=fff`;
                        }}
                      />
                    </div>
                    <div className="td-class-info">
                      <h4 className="td-class-name">
                        {classItem.type}{classItem.studentName ? ` - ${classItem.studentName}` : ' (Group)'}
                      </h4>
                      <p className="td-class-time">
                        {classItem.time} - {classItem.sessionType}
                      </p>
                    </div>
                    <button className={`td-join-btn ${classItem.isLive ? 'live' : ''}`}>
                      Join Class
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* My Students Card */}
            <div className="td-card td-students-card">
              <div className="td-card-header">
                <h2 className="td-card-title">
                  My Students <span className="td-sparkle">✦</span>
                </h2>
                <Link to="/students" className="td-view-all">View All</Link>
              </div>

              <div className="td-students-list">
                {myStudents.map((student) => (
                  <div key={student.id} className="td-student-item">
                    <div className="td-student-avatar">
                      <img 
                        src={student.avatar} 
                        alt={student.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1A9B8E&color=fff`;
                        }}
                      />
                    </div>
                    <div className="td-student-info">
                      <h4 className="td-student-name">{student.name}</h4>
                      <p className="td-student-progress">{student.surah}</p>
                      <p className="td-student-detail">{student.progress}</p>
                    </div>
                    <span 
                      className="td-student-badge"
                      style={{ backgroundColor: student.courseColor }}
                    >
                      {student.course}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Bottom Card */}
            <div className="td-card td-quick-actions-card">
              <div className="td-card-header">
                <h2 className="td-card-title">
                  Quick Actions <span className="td-sparkle">✦</span>
                </h2>
                <Link to="/actions" className="td-view-all">View All</Link>
              </div>

              <div className="td-quick-actions-grid">
                {quickActions.map((action) => (
                  <button key={action.id} className="td-quick-action-btn">
                    <div className="td-action-icon">
                      <i className={action.icon}></i>
                    </div>
                    <span className="td-action-label">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="td-right-column">
            {/* Schedule Calendar Card */}
            <div className="td-card td-schedule-card">
              <div className="td-card-header">
                <h2 className="td-card-title">
                  <i className="fas fa-calendar-alt"></i>
                  My Schedule
                </h2>
                <div className="td-calendar-nav">
                  <button onClick={() => navigateMonth(-1)} className="td-month-nav">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span className="td-current-month">{formatMonth(currentMonth)}</span>
                  <button onClick={() => navigateMonth(1)} className="td-month-nav">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div className="td-calendar">
                <div className="td-calendar-header">
                  {weekDays.map((day) => (
                    <span key={day} className="td-week-day">{day}</span>
                  ))}
                </div>
                <div className="td-calendar-grid">
                  {generateCalendarDays()}
                </div>
              </div>

              {/* Stats */}
              <div className="td-schedule-stats">
                <div className="td-stat-item">
                  <span className="td-stat-number">4</span>
                  <span className="td-stat-label">Classes <span className="td-sparkle small">✦</span></span>
                </div>
                <div className="td-stat-divider"></div>
                <div className="td-stat-item">
                  <span className="td-stat-number">20</span>
                  <span className="td-stat-label">This Week</span>
                </div>
              </div>
            </div>

            {/* Sidebar Quick Actions */}
            <div className="td-card td-sidebar-actions">
              <div className="td-card-header">
                <h2 className="td-card-title">
                  Quick Actions <span className="td-sparkle">✦</span>
                </h2>
              </div>

              <div className="td-sidebar-actions-list">
                {sidebarQuickActions.map((action) => (
                  <button key={action.id} className="td-sidebar-action-item">
                    <div className="td-sidebar-action-icon">
                      <i className={action.icon}></i>
                    </div>
                    <span className="td-sidebar-action-label">{action.label}</span>
                    <i className="fas fa-chevron-right td-action-arrow"></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Notes */}
            <div className="td-card td-notes-card">
              <div className="td-card-header">
                <h2 className="td-card-title">
                  Recent Notes <span className="td-sparkle">✦</span>
                </h2>
              </div>

              <div className="td-notes-list">
                {recentNotes.map((note) => (
                  <div key={note.id} className="td-note-item">
                    <div className="td-note-icon">
                      <i className={note.icon}></i>
                    </div>
                    <div className="td-note-content">
                      <h4 className="td-note-student">{note.student}</h4>
                      <p className="td-note-text">{note.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
