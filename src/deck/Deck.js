import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import NotFound from "../Layout/NotFound";
import Study from "../cards/Study";
import NewCard from "../cards/NewCard";
import EditCard from "../cards/EditCard";
import EditDeck from "./EditDeck";
import DeckDescription from "./DeckDescription";
import Breadcrumb from "../Layout/Breadcrumb";
import { readDeck } from "../utils/api";
import CardList from "../cards/CardList";

function Deck({updateCount, update}) {

    //TODO: Deck title and description, view button, study button, delete button
    const { deckId } = useParams();  
    const { path } = useRouteMatch(); 
    const [deck, setDeck] = useState({});

    // const [updateCount, setUpdateCount] = useState(0);

    // const createDeck = (newDeck) =>
    //   setDeck((currentDeck) => [
    //     newDeck,
    //     ...currentDeck,
    //   ]);
  
    // const deleteSubscriber = (indexToDelete) =>
    //   setSubscribers((currentSubscribers) =>
    //     currentSubscribers.filter((post, index) => index !== indexToDelete)
    //   );
    // const makeUpdate = () => {
    //     setUpdateCount((prevCount) => prevCount + 1);
    // }

    useEffect(() => {
        async function getDeckDetails() {
            readDeck(deckId).then((deck) => {
                setDeck(deck);
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
        getDeckDetails();
    }, [deckId, updateCount])

  return (
    <Switch>
        <Route exact={true} path={path}>
          <Breadcrumb currentText={deck.name} />
          <DeckDescription deck={deck} update={update} />
          <CardList cards={deck.cards} update={update} />
        </Route>
        <Route path={`${path}/study`}>
          <Study />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck update={update} />
        </Route>
        <Route path={`${path}/cards/new`}>
          <NewCard update={update} />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard update={update} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>  
  );
}

export default Deck;