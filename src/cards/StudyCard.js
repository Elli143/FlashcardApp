import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({card, isLast, setCardNumber}) {
    const history = useHistory();
    const [isFront, setIsFront] = useState(true);
    const [showNext, setShowNext] = useState(false);

    function handleFlip() {
        setIsFront(!isFront);
    }
    const front = card ? card.front : '';
    const back = card ? card.back : '';

    function restartDeck() {
        if(window.confirm('Restart cards?')) {
            setCardNumber();
            handleFlip();
        } else {
            history.push('/');
        }
    }

    function nextCard() {
        setCardNumber();
        handleFlip()
    }

    useEffect(() => {
        if(!isFront) {
            // Only show Next button if the back of the card is displayed
            setShowNext(true);
        } else {
            setShowNext(false);
        }
    }, [isFront])

    const cardData = isFront ? front : back;
    const next = () => {
        if(showNext) {
            if(isLast) {
                return <button onClick={restartDeck}>Next</button>
            }
            else {
                return <button onClick={nextCard}>Next</button>
            }
        }
        else return null;
    }

  return (
    <div className="cardSummary">
        {cardData}
        <div className="buttonRow">
            <button onClick={handleFlip}>Flip</button>
            {next()}
        </div>
    </div>
  );
}

export default StudyCard;