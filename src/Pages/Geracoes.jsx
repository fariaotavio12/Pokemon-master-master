import React, { useEffect, useState } from "react";
import Dados from "../componentes/Informacao";
import api from "../servicos/api";
export default function Home() {
  const [pokemons, setPokemon] = useState([]);
  const [geracoes, setGeracao] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [variavelProximo, setProximo] = useState(2);
  const [variavelTipos, setRegiao] = useState(0);
  const [variavelPokemon, setVariavelPokemon] = useState();
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    api
      .get("/pokemon/lista")
      .then((response) => setPokemon(response.data.pokemon))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  const fetchQuotes = (variavel) => {

    setProximo(2)
    setRegiao(variavelTipos - 1)

    try {

      const res =
        api
          .get("/pokemon/lista/" + variavel)
          .then((response) => setPokemon(response.data.pokemon))

          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      // Set the response to the state.


    } catch (err) {
      console.log(err);
    }
  };
  const informacao = (variavel) => {
    setVariavelPokemon(variavel?.nome)
    // console.log(variavelPokemon)
    console.log(isActive)
    const handleClick = event => {
      // 👇️ toggle isActive state on click
      setIsActive(current => !current);
    };
    handleClick()

  };



  return (

    <div className="App">
      <div className="flex">
        {geracoes?.map((geracoe) => <li key={geracoe} className='m-auto cursor-pointer list-none hover:text-red-600 justify-center' onClick={() => fetchQuotes(geracoe)}> Geraçao {geracoe}</li>)}
      </div>
      <div>
        <div className='sticky h-96 w-2/4 mt-10 m-auto mb-10 border-2 border-black bg-white overflow-scroll' style={{ display: isActive ? 'block' : 'none' }}
        >
          <button className="mrl-3/4" onClick={() => informacao()}>X</button>
          <Dados Dados={variavelPokemon} />
        </div>
        {pokemons?.map((pokemon) => <div key={pokemon.numero}
          className='flex ml-10 mr-10 cursor-pointer list-none hover:text-red-600 h-auto border-2 border-indigo-500/100 text-center justify-center'
        >
          <li onClick={() => informacao(pokemon)} className='flex'>
            <ul >{pokemon.numero}-</ul>
            <ul>{pokemon.nome}</ul>
          </li>

        </div>)}

      </div>

    </div>
  )
}