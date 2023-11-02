import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Breadcrumb from "../Layout/Breadcrumb";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function NewCard({update}) {
    const { deckId } = useParams();
    const initialCardState = {
        front: "",
        back: ""
      };
    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState({ ...initialCardState })

    useEffect(() => {
        readDeck(deckId).then((data) => {
            setDeck(data);
        })
    }, [deckId])

    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setCard({
          ...card,
          [target.name]: value,
        });
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      createCard(deckId, card).then(() => {
        update(); // Update count so that deck page will refresh with updated data
        setCard({...initialCardState});
      })
    };
  
  const deckName = deck ? deck.name : '';

  return (
    <div>
        <Breadcrumb deckName={deckName} deckUrl={`/decks/${deckId}`} currentText={`Add Card`} />
        <h1>{deckName}: Add Card</h1>
        <CardForm card={card} deckId={deckId} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default NewCard;