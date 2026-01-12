import './Pages.css';

function Scheduler() {
  const schedule = [
    {
      id: 1,
      day: 'Monday',
      course: 'Quranic Arabic',
      time: '3:00 PM - 4:30 PM',
      instructor: 'Sheikh Ahmed'
    },
    {
      id: 2,
      day: 'Tuesday',
      course: 'Islamic History',
      time: '4:00 PM - 5:30 PM',
      instructor: 'Dr. Hassan'
    },
    {
      id: 3,
      day: 'Wednesday',
      course: 'Hadith Sciences',
      time: '3:00 PM - 4:30 PM',
      instructor: 'Sheikh Muhammad'
    },
    {
      id: 4,
      day: 'Thursday',
      course: 'Islamic Jurisprudence',
      time: '4:00 PM - 5:30 PM',
      instructor: 'Dr. Ali'
    },
    {
      id: 5,
      day: 'Friday',
      course: 'Quran Recitation',
      time: '2:00 PM - 3:30 PM',
      instructor: 'Sheikh Fatima'
    },
    {
      id: 6,
      day: 'Saturday',
      course: 'Islamic Ethics',
      time: '3:00 PM - 4:30 PM',
      instructor: 'Dr. Zainab'
    }
  ];

  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">📅</div>
        <h1>Class Schedule</h1>
        <p>View and manage your weekly class schedule</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>

      <div className="page-content">
        <div className="schedule-grid">
          {schedule.map((item) => (
            <div key={item.id} className="schedule-card">
              <div className="day-badge">{item.day}</div>
              <h3>{item.course}</h3>
              <p><strong>Time:</strong> {item.time}</p>
              <p><strong>Instructor:</strong> {item.instructor}</p>
              <button className="join-btn">Join Class</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Scheduler;
