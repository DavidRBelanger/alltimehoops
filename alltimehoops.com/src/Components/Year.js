import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Nav from './Nav.js';
import TitleCard from './TitleCard.js';
import '../Styles/YearStyles.css';
import AwardsTile from './AwardsTile.js';
import ColoredLine from './ColoredLine.js';
import NotableOccurence from './NotableOccurence.js';
import StatLeadersTile from './StatLeadersTile.js';
import AdvancedStatLeadersTile from './AdvancedStatLeadersTile.js';
import AllStarsTile from './AllStarsTile.js';
import DraftTile from './DraftTile.js';
import ClipLoader from "react-spinners/ClipLoader";
import leftArrow from '../Images/left-arrow.png';
import rightArrow from '../Images/right-arrow.png';
import { Link } from 'react-router-dom';
import { VALID_RANGE } from './Constants.js';
import StandingsTile from './StandingsTile.js';
import Champions from './Champions.js';
import AllNbaTile from './AllNBATile.js';
import AllDefenseTile from './AllDefenseTile.js';
import AllRookieTile from './AllRookieTile.js';

/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * Year is a React component that fetches and displays NBA data for a given year.
 *
 * Props: None
 *
 * State:
 * - isLoading: An object to store the loading state of each child component. It's initially set to true for all components.
 * - isPageLoading: A boolean to store the loading state of the entire page. It's initially set to true.
 *
 * The component uses the useParams hook to get the year from the URL.
 * It uses the useNavigate hook to navigate to different pages.
 *
 * useEffect Hooks:
 * - The first useEffect hook sets isPageLoading to false when all child components have finished loading.
 * - The second useEffect hook navigates to '/year/invalid' if the year from the URL is not a valid year.
 *
 * Render:
 * - If the year is 'invalid', it renders a Nav component with the title "Invalid" and a message for the user.
 * - Otherwise, it renders a loader while the page is loading and then the NBA data for the given year.
 *   This includes a Nav component, a TitleCard component, and various tiles (AwardsTile, StatLeadersTile, etc.) for different types of data.
 *   Each tile is passed the year and a function to set its loading state to false when it has finished loading.
 */




function Year() {
    const { year } = useParams();
    const [isLoading, setIsLoading] = useState({
        awardsTile: true,
        statLeadersTile: true,
        notableOccurence0: true,
        notableOccurence1: true,
        notableOccurence2: true,
        notableOccurence3: true,
        notableOccurence4: true,
        notableOccurence5: true,
        notableOccurence6: true,
        notableOccurence7: true,
        notableOccurence8: true,
        notableOccurence9: true,
        notableOccurence10: true,
        advancedStatLeadersTile: true,
        allStarsTile: true,
        draftTile: true,
        standingsTile: true,
        champions: true,
        allNbaTile: true
    });

    const [isPageLoading, setIsPageLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollBy(0,1);
        window.scrollBy(0,-1);
        if (!Object.values(isLoading).includes(true)) {
            setIsPageLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (!year || year.length !== 4 || isNaN(year) || year < VALID_RANGE.start || year > VALID_RANGE.end) {
            navigate('/year/invalid');
        }
    }, [year]);

    if (year === 'invalid') {
        return (
            <>
                <Nav title="Invalid" />
                <div className="invalid-class">
                    <h1>404 Error</h1>
                    <h2>The year in the URL is either invalid or hasn't been created yet.</h2>
                    <h2>Visit <a href="/support">Support</a> if you think there's an issue.</h2>
                </div>
            </>
        )
    }

    return (
        <>
            <div id="loader" style={{ visibility: isPageLoading ? 'visible' : 'hidden' }}>
                <ClipLoader color="var(--orange)" size={50} />
            </div>

            <div id="arrow-container">
                {/* these lines determines if the year attempted to be accessed is within the valid range */}
                <Link to={`/year/${parseInt(year) - 1}`} onClick={(e) => parseInt(year) - 1 < VALID_RANGE.start && e.preventDefault()}>
                    <img id="left-arrow" src={leftArrow} alt="left arrow" style={{ opacity: parseInt(year) - 1 < VALID_RANGE.start ? 0.5 : 1 }} />
                </Link>


                <Link to={`/year/${parseInt(year) + 1}`} onClick={(e) => parseInt(year) + 1 > VALID_RANGE.end && e.preventDefault()}>
                    <img id="right-arrow" src={rightArrow} alt="right arrow" style={{ opacity: parseInt(year) + 1 > VALID_RANGE.end ? 0.5 : 1 }} />
                </Link>
            </div>
            <div style={{ visibility: isPageLoading ? 'hidden' : 'visible' }}>
                <Nav title={year + '-' + (parseInt(year) + 1)} />
                <div className="top-columns-container">
                    <div className="left-column">
                        <AwardsTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, awardsTile: false }))} />
                    </div>
                    <div className="right-column">
                        <TitleCard id="title-card" title={year + "-" + (parseInt(year) + 1) + ' NBA Season'} />
                    </div>
                </div>
                <ColoredLine color="white"></ColoredLine>
                <div className="bottom-columns-container">
                    <div className="left-column">
                        <Champions year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, champions: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence1: false }))} occurenceNum={1} />
                        <StatLeadersTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, statLeadersTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence2: false }))} occurenceNum={2} />
                        <AdvancedStatLeadersTile setIsLoading={() => setIsLoading(prev => ({ ...prev, advancedStatLeadersTile: false }))} year={year} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence4: false }))} occurenceNum={4} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence6: false }))} occurenceNum={6} />
                        <DraftTile year={(parseInt(year) + 1).toString()} setIsLoading={() => setIsLoading(prev => ({ ...prev, draftTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence8: false }))} occurenceNum={8} />
                        <AllDefenseTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, allDefenseTile: false }))} />
                    </div>
                    <div className="right-column">
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence0: false }))} occurenceNum={0} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence3: false }))} occurenceNum={3} />
                        <AllStarsTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, allStarsTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence5: false }))} occurenceNum={5} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence7: false }))} occurenceNum={7} />
                        <StandingsTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, standingsTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence9: false }))} occurenceNum={9} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence10: false }))} occurenceNum={10} />
                        <AllNbaTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, allNbaTile: false }))} />
                        <AllRookieTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, allRookieTile: false }))} />

                    </div>
                </div>
            </div>
        </>
    );
}

export default Year;