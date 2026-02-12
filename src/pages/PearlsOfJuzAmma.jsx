import './PearlsOfJuzAmma.css';
import usePageTitle from '../hooks/usePageTitle';
import sheikhZaid from '../assets/sheikhzaid.png';
import { FaStar, FaRegClock, FaBookOpen, FaUsers } from 'react-icons/fa';

function PearlsOfJuzAmma() {
  usePageTitle('Pearls Of Juz Amma');

  return (
    <div className="pearl-page page-container">
      <div className="pearl-grid">
        <main className="pearl-main">
          <h1 className="pearl-title">Pearls Of Juz Amma</h1>

          <div className="pearl-meta">
            <p className="pearl-sub">For ages 7–16 — Learn Quran memorization starting from the 30th Juz with perfect Tajweed, guided by expert teachers.</p>

            <div className="pearl-badges">
              <span className="badge best">Best Seller</span>
              <span className="rating"><FaStar /> 4.5</span>
              <span className="students"><FaUsers /> 128 Students</span>
              <span className="duration"><FaRegClock /> 2 Hours</span>
              <span className="sections"><FaBookOpen /> 80 Sections</span>
            </div>

            <div className="instructor-inline">
              <img src={sheikhZaid} alt="Shaik Zaid" />
              <div>
                <div className="instructor-name">Shaik Zaid</div>
                <div className="instructor-role">Teacher</div>
              </div>
            </div>
          </div>

          <section className="pearl-learn">
            <h2>What You'll Learn?</h2>
            <div className="learn-grid">
              <ul>
                <li>Memorization of Juz Amma (30th Para) with proper Tajweed.</li>
                <li>Daily Quran recitation routines and discipline.</li>
                <li>Understanding the meanings of selected Surahs.</li>
                <li>Correct pronunciation of Arabic letters and words.</li>
                <li>Mastery of Tajweed rules for accurate recitation.</li>
              </ul>

              <ul>
                <li>Confidence in reciting Quran independently.</li>
                <li>Respectful recitation with proper pauses and elongations.</li>
                <li>Spiritual development and connection with the Quran.</li>
                <li>Improved focus and memorization techniques.</li>
                <li>Fluency in Surahs used in daily prayers.</li>
              </ul>
            </div>
          </section>

          <section className="pearl-requirements">
            <h2>Requirements</h2>
            <ul>
              <li>Age between 7 to 16 years.</li>
              <li>Stable internet connection and a quiet space.</li>
              <li>A notebook and pen for notes.</li>
              <li>Commitment to daily recitation and revision.</li>
              <li>Respectful and disciplined learning attitude.</li>
            </ul>
          </section>

          <section className="pearl-description">
            <h2>Course Description</h2>
            <p>
              Pearls of Juz Amma is a structured Quran memorization course designed for children aged
              7–16. Starting with the 30th Juz, students are guided by expert teachers who emphasize
              perfect Tajweed and fluency. With short, daily sessions and a compassionate teaching
              approach, this course builds a strong Quranic foundation while encouraging spiritual growth.
            </p>
          </section>

          <section className="instructor-section">
            <h2>Instructor</h2>
            <div className="instructor-card">
              <div className="instructor-card__head">
                <img src={sheikhZaid} alt="Shaik Zaid" />
                <div>
                  <div className="instructor-card__name">Shaik Zaid</div>
                  <div className="instructor-card__role">Teacher</div>
                </div>
              </div>
              <div className="instructor-card__stats">
                <span>4.7 Instructor Rating</span>
                <span>803,986 Students</span>
                <span>250,163 Reviews</span>
                <span>4 Courses</span>
              </div>
              <p className="instructor-card__bio">
                Shaik Zaid is the founder and lead instructor at AlNoorQuranAcademyOfficial. With years of experience in teaching Quran and Islamic studies online, he is known for his supportive teaching style, deep knowledge of Tajweed, and ability to connect with students of all ages.
              </p>
            </div>
          </section>

          <section className="course-rating">
            <h2>Course Rating</h2>
            <div className="rating-grid">
              <article className="review-card">
                <div className="review-card__header">My Son Now Recites With Confidence!</div>
                <div className="review-card__body">The improvement in his Tajweed and memorization after just a few weeks is amazing. The teacher is very patient and engaging.</div>
                <div className="review-card__author">Emily Carter</div>
              </article>

              <article className="review-card">
                <div className="review-card__header">Structured, Professional, And Effective!</div>
                <div className="review-card__body">We love the discipline this course brought into our routine. My daughter enjoys her Quran time every day.</div>
                <div className="review-card__author">Michael Brown</div>
              </article>

              <article className="review-card">
                <div className="review-card__header">Best Online Quran Experience We've Had!</div>
                <div className="review-card__body">Shaik Zaid ensures quality, and the feedback after each class really helps. Highly recommend to other parents.</div>
                <div className="review-card__author">Sophia Turner</div>
              </article>

              <article className="review-card">
                <div className="review-card__header">My Child Never Misses A Class!</div>
                <div className="review-card__body">He used to find online learning boring, but now he looks forward to his Quran lesson. It's a blessing!</div>
                <div className="review-card__author">Daniel Wilson</div>
              </article>
            </div>
          </section>

        </main>

        <aside className="pearl-aside">
          <div className="aside-card">
            <div className="video-wrap">
              <video width="100%" height="200" controls>
                <source src="/videoplayback.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="price-block">
              <div className="price">$750.00 <span className="currency">USD</span></div>
              <div className="instructor-small">
                <img src={sheikhZaid} alt="Shaik Zaid" />
                <div>
                  <div className="name">Shaik Zaid</div>
                  <div className="role">Teacher</div>
                </div>
              </div>

              <ul className="includes">
                <li>30 minutes of learning per day</li>
                <li>Beginner to intermediate</li>
                <li>5 days a week</li>
                <li>Qawaid-focused memorization</li>
              </ul>

              <button className="purchase">Purchase Course</button>
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}

export default PearlsOfJuzAmma;
