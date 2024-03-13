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
import Loader from './Loader.js';
import DraftTile from './DraftTile.js';
import ClipLoader from "react-spinners/ClipLoader";
import leftArrow from '../Images/left-arrow.png';
import rightArrow from '../Images/right-arrow.png';
import { Link } from 'react-router-dom';
import { VALID_RANGE } from './Constants.js';
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
        advancedStatLeadersTile: true,
        allStarsTile: true,
        draftTile: true,
    });

    const [isPageLoading, setIsPageLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
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
                    <h1>Lost?</h1>
                    <h2>The year in the URL is either invalid or hasn't been created yet.</h2>
                    <h2>Checkout <a href="/support">Support</a> if you think there's an issue.</h2>
                </div>
            </>
        )
    }

    return (
        <>
            <div id="loader" style={{ visibility: isPageLoading ? 'visible' : 'hidden' }}>
                <ClipLoader color="var(--orange)" size={50} />
            </div>
            <Link to={`/year/${parseInt(year) - 1}`} onClick={(e) => parseInt(year) - 1 < VALID_RANGE.start && e.preventDefault()}>
                <img id="left-arrow" src={leftArrow} alt="left arrow" style={{ opacity: parseInt(year) - 1 < VALID_RANGE.start ? 0.5 : 1 }} />
            </Link>
            <Link to={`/year/${parseInt(year) + 1}`} onClick={(e) => parseInt(year) + 1 > VALID_RANGE.end && e.preventDefault()}>
                <img id="right-arrow" src={rightArrow} alt="right arrow" style={{ opacity: parseInt(year) + 1 > VALID_RANGE.end ? 0.5 : 1 }} />
            </Link>
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
                        <StatLeadersTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, statLeadersTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence0: false }))} occurenceNum={0} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence2: false }))} occurenceNum={2} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence4: false }))} occurenceNum={4} />
                        <DraftTile year={(parseInt(year) + 1).toString()} setIsLoading={() => setIsLoading(prev => ({ ...prev, draftTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence6: false }))} occurenceNum={6} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence8: false }))} occurenceNum={8} />
                    </div>
                    <div className="right-column">
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence1: false }))} occurenceNum={1} />
                        <AdvancedStatLeadersTile setIsLoading={() => setIsLoading(prev => ({ ...prev, advancedStatLeadersTile: false }))} year={year} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence3: false }))} occurenceNum={3} />
                        <AllStarsTile year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, allStarsTile: false }))} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence5: false }))} occurenceNum={5} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence7: false }))} occurenceNum={7} />
                        <NotableOccurence year={year} setIsLoading={() => setIsLoading(prev => ({ ...prev, notableOccurence9: false }))} occurenceNum={9} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Year;