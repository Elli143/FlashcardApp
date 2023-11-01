import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";

function NewDeck({update}) {

    //TODO: 
    const initialDeckState = {
        name: "",
        description: "",
      };
    const [ deck, setDeck ] = useState({...initialDeckState});
    const history = useHistory();

    useEffect(() => {
        // readDeck(deckId).then((data) => {
        //     console.log('set deck data', data)
        //     setDeck(data);
        // })
    }, [])

    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setDeck({
          ...deck,
          [target.name]: value,
        });
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitted:", deck);
      createDeck(deck).then((data) => {
        const deckId = data.id;
        console.log('data', data);
        update(); // Update count so that decks will update with new data
        history.push(`/decks/${deckId}`)
      })
    };
  
    const deckForm = (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={deck.name}
          />
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={deck.description}
          />
        </label>
        <button type="submit">Save</button>
        <button onClick={() => history.push(`/`)}>Cancel</button>
      </form>
    );

  return (
    <div>
        <Breadcrumb currentText={`Create Deck`} />
        <h1>Create Deck</h1>
        {deckForm}
    </div>
  );
}

export default NewDeck;