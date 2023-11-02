import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({card, isLast, setCardNumber}) {
    const history = useHistory();
    const [isFront, setIsFront] = useState(true);

    function handleFlip() {
        setIsFront(!isFront);
    }
    const front = card ? card.front : '';
    const back = card ? card.back : '';
    const cardData = isFront ? front : back;
    const next = isLast ? <button onClick={restartDeck}>Next</button> : <button onClick={nextCard}>Next</button>

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

  return (
    <div className="cardSummary">
        {cardData}
        <div className="buttonRow">
            <button onClick={handleFlip}>Flip</button>
            {!isFront && next}
        </div>
    </div>
  );
}

export default StudyCard;