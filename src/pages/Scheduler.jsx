import './Pages.css';
import usePageTitle from "../hooks/usePageTitle";

function Scheduler() {
  usePageTitle("Scheduler");
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
        <h1>Class Schedule</h1>
        <p>View and manage your weekly class schedule</p>
      </header>


      <div className="loader">
        <h1>coming soon...</h1>
      </div>

      {/* <div className="page-content">
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
      </div> */}
    </div>
  );
}

export default Scheduler;
