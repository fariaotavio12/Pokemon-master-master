import React, { useEffect, useState, useCallback } from "react";
import api from "../servicos/api";
import Dados from "../componentes/Informacao";

export default function Home() {
  const [Tipos, setTipos] = useState([]);
  const [pokemons, setPokemon] = useState([]);
  const [variavelProximo, setProximo] = useState(2);
  const [variavelTipos, setRegiao] = useState(0);
  const [variavelPokemon, setVariavelPokemon] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await api
        .get("/tipos")
        .then((response) => setTipos(response.data.tipos))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }

    const loadData1 = async () => {
      await api
        .get("/pokemon/tipo/normal/20/1")
        .then((response) => setPokemon(response.data.pokemon))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
    loadData()
    loadData1()
    console.log(pokemons)
  }, []);

  const fetchQuotes = (variavel, rotaRegiao) => {

    setProximo(2)
    setRegiao(rotaRegiao - 1)

    try {

      const res =
        api
          .get("/pokemon/tipo/" + variavel + "/20/1")
          .then((response) => setPokemon(response.data.pokemon))

          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      console.log(pokemons)


    } catch (err) {
      console.log(err);
    }
    console.log(variavel)
  };



  const anterior = (paginacao, paginacaoRegiao) => {
    if (paginacao > 1) {
      paginacao = paginacao - 1
      setProximo(variavelProximo - 1)
      try {

        console.log(variavelProximo)
        const res =
          api
            .get("/pokemon/tipo/" + Tipos[variavelTipos].nome + "/20/" + variavelProximo)
            .then((response) => setPokemon(response.data.pokemon))

            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
      } catch (err) {
        console.log(err);
      }
    }
    if (paginacao <= 1) {
      if (paginacaoRegiao > 1) {
        alert('Nao tem mais pokemons do tipo: ' + Tipos[variavelTipos].nome)
      }
    }
  }

  const proximo = (paginacao, paginacaoRegiao) => {
    setProximo(variavelProximo + 1)
    try {
      const res =
        api
          .get("/pokemon/tipo/" + Tipos[variavelTipos].nome + "/20/" + variavelProximo)
          // console.log('oi' + variavelProximo)
          .then((response) => setPokemon(response.data.pokemon))

          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      if (pokemons == null || pokemons == undefined) {
        alert('Nao tem mais pokemons do tipo: ' + Tipos[variavelTipos].nome)
      }

    } catch (err) {
      console.log(err);
    }


  }
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
    <div className="">
      <div className="flex flex-col">
        <div className="flex flex-wrap">
          {Tipos?.map((tipo) => <li key={tipo.id} className='m-auto ml-2 cursor-pointer list-none hover:text-red-600' onClick={() => fetchQuotes(tipo.nome, tipo.id)}>{tipo.nome}</li>)}
        </div>
        <div className='sticky h-96 w-2/4 mt-10 m-auto mb-10 border-2 border-black bg-white overflow-scroll' style={{ display: isActive ? 'block' : 'none' }}
        >
          <button className="mrl-3/4" onClick={() => informacao()}>X</button>
          <Dados Dados={variavelPokemon} />
        </div>
        <div>
          {pokemons?.map((pokemon) => <div key={pokemon.numero}
            className='flex ml-10 mr-10 cursor-pointer list-none hover:text-red-600 h-auto border-2 border-indigo-500/100 text-center justify-center'
          >
            <li onClick={() => informacao(pokemon)}>{pokemon.numero}-</li>
            <li>{pokemon.nome}</li>
            <img src={pokemon.img} className='h-8'></img>
          </div>)}

        </div>
      </div>
      <div className="flex text-center justify-center">
        <button className='bg-indigo-500/100' onClick={() => anterior(variavelProximo, variavelTipos)}>Anterior</button>
        <button className='bg-indigo-500/100' onClick={() => proximo(variavelProximo, variavelTipos)}>Proximo</button>
      </div>
    </div>
  )
}