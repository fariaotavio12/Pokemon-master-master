import React, { useEffect, useState, useCallback } from "react";
import api from "../servicos/api";
import Dados from "../componentes/Informacao";

export default function Home() {
  const [regioes, setUser] = useState([]);
  const [pokemons, setPokemon] = useState([]);
  const [variavelProximo, setProximo] = useState(2);
  const [variavelRegiao, setRegiao] = useState(0);
  const [variavelPokemon, setVariavelPokemon] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await api
        .get("/regioes")
        .then((response) => setUser(response.data.regioes))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
    const loadData1 = async () => {
      await api
        .get("/pokemon/regiao/" + 'kanto' + "/20/1")
        .then((response) => setPokemon(response.data.pokemon))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
    loadData()
    loadData1()
  }, []);
  const fetchQuotes = (variavel, rotaRegiao) => {

    setProximo(2)
    setRegiao(rotaRegiao - 1)

    try {

      const res =
        api
          .get("/pokemon/regiao/" + variavel + "/20/1")
          .then((response) => setPokemon(response.data.pokemon))

          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      // Set the response to the state.


    } catch (err) {
      console.log(err);
    }
  };



  const anterior = (paginacao, paginacaoRegiao) => {
    if (paginacao > 1) {
      paginacao = paginacao - 1


      setProximo(variavelProximo - 1)

      try {

        console.log(variavelProximo)
        const res =
          api
            .get("/pokemon/regiao/" + regioes[variavelRegiao].nome + "/20/" + variavelProximo)
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
          .get("/pokemon/regiao/" + regioes[variavelRegiao].nome + "/20/" + variavelProximo)
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
        <div className="flex">
          {regioes?.map((regiao) => <li key={regiao.id} className='m-auto cursor-pointer list-none hover:text-red-600' onClick={() => fetchQuotes(regiao.nome, regiao.id)}>{regiao.nome}</li>)}
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
            <li onClick={() => informacao(pokemon)} className='flex'>
              <ul >{pokemon.numero}-</ul>
              <ul>{pokemon.nome}</ul>
              <img src={pokemon.img} className='h-8'></img>
            </li>

          </div>)}

        </div>
      </div>
      <div className="flex text-center justify-center">
        <button className='bg-indigo-500/100' onClick={() => anterior(variavelProximo, variavelRegiao)}>Anterior</button>
        <button className='bg-indigo-500/100' onClick={() => proximo(variavelProximo, variavelRegiao)}>Proximo</button>
      </div>
    </div>
  )
}