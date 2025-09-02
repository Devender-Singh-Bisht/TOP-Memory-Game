
import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/Gamespace.css";




export default function Gamespace() {

    const [pokemonsData, setPokemonsData] = useState([]);

    const dummyCards = Array(10).fill({});
    const [cards, setCards] = useState(dummyCards);


    const getRandomCards = (pokemonsData, n) => {
        const randomNumbers = [];
        let max = pokemonsData.length - 1;
        while (randomNumbers.length < n) {
            const randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }

        let cardsData = [];
        randomNumbers.forEach((i) => cardsData.push(pokemonsData[i]));

        return cardsData;
    }


    useEffect(() => {

        const fetchData = async () => {
            const pokemonUrls = await fetchPokemons();

            let pokemonArray = pokemonUrls["results"];
            const pokemons = await fetchEachPokemon(pokemonArray)

            setPokemonsData(pokemons);

            let cardsData = getRandomCards(pokemons, 10);
            setCards(cardsData)
        }

        fetchData();

    }, []);


    return (
        <section className="game-space">
            {
                cards.map((obj) => <Card key={obj["name"]} name={obj["name"]} src={obj["src"]} />)
            }
        </section>
    );
}



async function fetchPokemons() {
    let limit = 30;
    let offset = Math.floor(Math.random() * 1000);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(url);
        const pokemons = await response.json();
        return pokemons
    }
    catch (error) {
        console.log(error.name);
        return null;
    }
}


async function fetchEachPokemon(pokemonArray) {
    let finalPokemonData = []
    console.log(pokemonArray.length)
    try {
        for (const poke of pokemonArray) {
            const response = await fetch(poke["url"]);
            const pokemon = await response.json();

            let pokemonData = {};
            pokemonData["name"] = poke.name;
            pokemonData["src"] = pokemon["sprites"]["other"]["dream_world"]["front_default"];
            finalPokemonData.push(pokemonData);
        }
    }
    catch (error) {
        console.log(error.name);
    }
    return finalPokemonData;
}