import React from 'react';
import { useHistory } from 'react-router-dom';

function CardForm({card, deckId, handleChange, handleSubmit}) {
    const history = useHistory();
    const cardForm = (
        <form onSubmit={handleSubmit}>
          <label htmlFor="front">
            Front:
            <textarea
              id="front"
              name="front"
              onChange={handleChange}
              value={card.front}
            />
          </label>
          <br />
          <label htmlFor="back">
            Back:
            <textarea
              id="back"
              name="back"
              onChange={handleChange}
              value={card.back}
            />
          </label>
          <button type="submit">Submit</button>
          <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        </form>
      );

      return cardForm;
}

export default CardForm;