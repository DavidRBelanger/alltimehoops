import { useNavigate } from 'react-router-dom';
import { VALID_RANGE } from './Constants.js';
/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * Dropdowns is a React component that displays a series of dropdown menus for different decades.
 * Each dropdown contains years from that decade. When a year is selected, the app navigates to a page for that year.
 *
 * Props: None
 *
 * The component uses the `useNavigate` hook from `react-router-dom` to get the `navigate` function, which is used to navigate to different pages.
 *
 * The `handleSelectChange` function is called when the selected option in any dropdown changes.
 * It gets the selected year and navigates to the page for that year.
 *
 * The component renders a div with the class "dropdowns-container". Inside this div, it renders a dropdown for each decade.
 * Each dropdown contains an option for each year in that decade. The options are disabled if the year is outside the valid range.
 */

function Dropdowns() {
  const navigate = useNavigate();
  const decades = ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];

  const handleSelectChange = (event) => {
    const year = event.target.value;
    if (year) {
      
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