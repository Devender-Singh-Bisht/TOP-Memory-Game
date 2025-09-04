
import { useEffect, useState } from "react";
import Card from "./Card";
import ScorePopup from "./ScorePopUp";
import "../styles/Gamespace.css";




export default function Gamespace({ level, score, bestScore, setScore, setBestScore }) {

    const [pokemonsData, setPokemonsData] = useState([]);

    const dummyCards = Array.from({ length: level }, () => ({ name: null, src: null }));
    const [cards, setCards] = useState(dummyCards);
    const [clickedCards, setClickedCards] = useState([]);


    const getRandomCards = (pokemonsData, n) => {
        let max = pokemonsData.length;
        if (max === 0) {
            return []
        }

        const randomNumbers = [];
        while (randomNumbers.length < n) {
            const randomNumber = Math.floor(Math.random() * (max));
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }

        let cardsData = [];
        randomNumbers.forEach((i) => cardsData.push(pokemonsData[i]));

        return cardsData;
    }

    const shuffleCards = () => {
        let newCards = getRandomCards(cards, level);
        setCards(newCards)
    }

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            let newCards = getRandomCards(pokemonsData, level);
            setCards(newCards);
            setClickedCards([]);
            setScore(0);
            if (score > bestScore) {
                setBestScore(score);
            }
            return
        }

        shuffleCards();
        setClickedCards(prevClicked => [...prevClicked, id]);
        setScore(prevScore => prevScore + 1);
    }

    useEffect(() => {

        const fetchData = async () => {
            const pokemonUrls = await fetchPokemons();

            let pokemonArray = pokemonUrls["results"];
            const pokemons = await fetchEachPokemon(pokemonArray)

            setPokemonsData(pokemons);

            let cardsData = getRandomCards(pokemons, level);
            setCards(cardsData)
        }

        fetchData();

    }, []);


    useEffect(() => {
        if (pokemonsData.length > 0) {
            let cardsData = getRandomCards(pokemonsData, level);
            setCards(cardsData);
            setScore(0);
            setBestScore(0);
        }
    }, [level]);


    return (
        (cards.length === 0) ?
            (
                <div className="error">
                    <h1>"Something went wrong.</h1>
                    <h1>Please check your internet connection and try again.</h1>
                </div>
            ) :
            (<section className="game-space">
                <ScorePopup score={score} level={level} />
                {cards.map((obj, index) => <Card key={(obj["name"]) ? (obj["name"]) : (index)} name={obj["name"]} src={obj["src"]} handleCardClick={handleCardClick} />)}
            </section>)
    );
}



async function fetchPokemons() {
    let limit = 40;
    let offset = Math.floor(Math.random() * 1000);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(url);
        const pokemons = await response.json();
        return pokemons
    }
    catch {
        return { "results": [] }
    }
}


async function fetchEachPokemon(pokemonArray) {
    let finalPokemonData = []
    try {
        for (const poke of pokemonArray) {
            const response = await fetch(poke["url"]);
            const pokemon = await response.json();

            let pokemonData = {};
            pokemonData["name"] = pokemon.name;

            let src = pokemon["sprites"]["other"]["dream_world"]["front_default"];
            if (!src) {
                src = pokemon["sprites"]["front_default"]
            }
            pokemonData["src"] = src
            finalPokemonData.push(pokemonData);
        }
    }
    catch {
        finalPokemonData = [];
    }
    return finalPokemonData;
}