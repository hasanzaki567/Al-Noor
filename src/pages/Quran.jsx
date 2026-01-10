import './Pages.css';

function Quran() {
  const surahs = [
    { id: 1, name: 'Al-Fatihah', number: 1, verses: 7, meaning: 'The Opening' },
    { id: 2, name: 'Al-Baqarah', number: 2, verses: 286, meaning: 'The Cow' },
    { id: 3, name: 'Al-Imran', number: 3, verses: 200, meaning: 'The Family of Imran' },
    { id: 4, name: 'An-Nisa', number: 4, verses: 176, meaning: 'The Women' },
    { id: 5, name: 'Al-Maidah', number: 5, verses: 120, meaning: 'The Table Spread' },
    { id: 6, name: 'Al-Anam', number: 6, verses: 165, meaning: 'The Cattle' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Holy Quran</h1>
        <p>Read and study the Holy Quran with translations and explanations</p>
      </div>

      <div className="page-content">
        <div className="quran-grid">
          {surahs.map((surah) => (
            <div key={surah.id} className="surah-card">
              <div className="surah-number">{surah.number}</div>
              <h3>{surah.name}</h3>
              <p className="surah-meaning">{surah.meaning}</p>
              <p className="surah-verses">Verses: {surah.verses}</p>
              <button className="read-btn">Read Surah</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quran;
