import './CourseShowcase.css';
import { Link } from 'react-router-dom';
import sheikhZaid from '../assets/sheikhzaid.png';
import madinaImage from '../assets/madina.jpg';
import mosqueboyImage from '../assets/mosqueboy.jpg';
import mosqueboy2Image from '../assets/mosqueboy2.jpg';
import ustadhImage from '../assets/ustadh.png';
import { FaLayerGroup, FaClock, FaUserFriends } from 'react-icons/fa';

const featuredCourses = [
  {
    id: 'pearls-of-juz-amma',
    title: 'Pearls of Juz Amma',
    description: 'Learn Quran memorization starting from the 30th Juz with expert teachers.',
    price: '$450.00',
    originalPrice: '$480.00',
    sections: '140 Sections',
    hours: '48 Hours',
    students: '40 Students',
    image: madinaImage,
  },
  {
    id: 'young-quranic-gems',
    title: 'Young Quranic Gems',
    description: 'Interactive Tajweed and Surah memorization course for young kids aged 5.5 to 8 years.',
    price: '$750.00',
    originalPrice: '$780.00',
    sections: '80 Sections',
    hours: '62 Hours',
    students: '100+ Students',
    image: mosqueboyImage,
  },
  {
    id: 'quranic-blossoms',
    title: 'Quranic Blossoms',
    description: 'Online Tajweed and memorization classes for females aged 16–35+, with flexible timings.',
    price: '$350.00',
    originalPrice: '$380.00',
    sections: '160 Sections',
    hours: '60 Hours',
    students: '30 Students',
    image: mosqueboy2Image,
  },
  {
    id: 'quranic-guardians',
    title: 'Quranic Guardians',
    description: 'Quran recitation and memorization course with Tajweed for males aged 19–35+, conducted online.',
    price: '$230.00',
    originalPrice: '$280.00',
    sections: '150 Sections',
    hours: '40 Hours',
    students: '15 Students',
    image: ustadhImage,
  },
];

function CourseShowcase({ heading = 'Our Cool Courses!', ctaLabel = 'View All Courses' }) {
  return (
    <section className="course-showcase">
      <div className="course-showcase__header">
        <div className="course-showcase__titles">
          <p className="course-showcase__pretitle">Check Out</p>
          <h2>{heading}</h2>
        </div>
        <button className="course-showcase__cta">{ctaLabel}</button>
      </div>

      <div className="course-showcase__grid">
        {featuredCourses.map((course) => (
          <article key={course.id} className="course-card">
            <div className="course-card__media">
              <img src={course.image} alt={course.title} />
              <div className="course-card__instructor">
                <img src={sheikhZaid} alt="Shaik Zaid" />
                <span>Shaik Zaid</span>
              </div>
            </div>

            <div className="course-card__body">
              <h3>{course.title}</h3>
              <p className="course-card__description">{course.description}</p>

              <div className="course-card__stats">
                <span><FaLayerGroup aria-hidden="true" />{course.sections}</span>
                <span><FaClock aria-hidden="true" />{course.hours}</span>
                <span><FaUserFriends aria-hidden="true" />{course.students}</span>
              </div>

              <div className="course-card__footer">
                <div className="course-card__pricing">
                  <span className="course-card__price">{course.price}</span>
                  <span className="course-card__price course-card__price--old">{course.originalPrice}</span>
                </div>
                <Link to={`/course/${course.id}`} className="course-card__button" type="button">View Course Details</Link>
                <Link to={`/register?course=${course.id}`} className="course-card__button course-card__button--primary" aria-label={`Enroll in ${course.title}`}>
                  Enroll Now
                </Link>
              </div>
              
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CourseShowcase;
