import './Pages.css';

function Courses() {
  const coursesList = [
    {
      id: 1,
      title: 'Quranic Arabic',
      instructor: 'Sheikh Ahmed',
      level: 'Beginner',
      duration: '8 weeks',
      students: 245
    },
    {
      id: 2,
      title: 'Islamic History',
      instructor: 'Dr. Hassan',
      level: 'Intermediate',
      duration: '12 weeks',
      students: 189
    },
    {
      id: 3,
      title: 'Hadith Sciences',
      instructor: 'Sheikh Muhammad',
      level: 'Advanced',
      duration: '16 weeks',
      students: 156
    },
    {
      id: 4,
      title: 'Islamic Jurisprudence',
      instructor: 'Dr. Ali',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 203
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Courses</h1>
        <p>Explore our comprehensive collection of Islamic learning courses</p>
      </div>

      <div className="page-content">
        <div className="courses-grid">
          {coursesList.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h2>{course.title}</h2>
                <span className={`level ${course.level.toLowerCase()}`}>{course.level}</span>
              </div>
              <div className="course-details">
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Students:</strong> {course.students} enrolled</p>
              </div>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
