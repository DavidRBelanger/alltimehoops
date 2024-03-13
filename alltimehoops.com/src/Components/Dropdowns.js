import { useNavigate } from 'react-router-dom';
import { VALID_RANGE } from './Constants.js';
function Dropdowns() {
  const navigate = useNavigate();
  const decades = ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];

  const handleSelectChange = (event) => {
    const year = event.target.value;
    if (year) {
      // Redirect to the selected year's page
      navigate('/year/' + year);
    }
  };

  return (
    <div className="dropdowns-container">
      {decades.map((decade) => (
        <select key={decade} onChange={handleSelectChange}>
          <option disabled selected>{decade}s</option>
          <option value={decade} disabled={decade < VALID_RANGE.start || decade > VALID_RANGE.end}>{decade}</option>
          {Array.from({ length: 9 }, (_, i) => i + 1 + parseInt(decade)).map((year) => (
            <option key={year} value={year} disabled={year < VALID_RANGE.start || year > VALID_RANGE.end}>
              {year}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

export default Dropdowns;