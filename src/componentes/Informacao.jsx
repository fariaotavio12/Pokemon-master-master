import React, { useEffect, useState } from "react";
import api from "../servicos/api";

const Dados = (dados) => {
    const [pokemons, setPokemon] = useState([]);

    useEffect(() => {




    }, []);
    const informacaoPokemon = () => {

        if (dados != null && dados != undefined) {
            console.log(dados.Dados)
            api
                .get("/pokemon/nome/" + dados.Dados)
                .then((response) => setPokemon(response.data.pokemon))
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
            

        }

    };
    return (
        <div className="h-5/6 w-full m-auto border-2 text-center">

            <button className=" h-8 w-20 bg-indigo-500/100 " onClick={() => informacaoPokemon()}>Carregar</button>
            <div className="flex flex-wrap p-4 ">
                <ul className="ml-4 mt-2 mr-4"><a className="mr-2">Numero: </a>{pokemons?.numero}-</ul>
                <ul className="ml-4 mt-2 mr-4"><a className="mr-2">Nome: </a>{pokemons?.nome}</ul>
                <ul className="ml-4 mt-2 mr-4"><a className="mr-2">Altura:</a>{pokemons?.altura}</ul>
                <ul className="ml-4 mt-2 mr-4"><a className="mr-2">Peso:</a>{pokemons?.peso}</ul>
                <ul className="ml-4 mt-2 mr-4"><a className="mr-2">Tipo:</a>{pokemons?.tipo}-</ul>
                <ul className="ml-4 mt-2 mr-4"><a className="mr-2">Geração: </a>{pokemons?.geracao}</ul>
                <ul>
                    <a>Img normal:</a>
                    <img src={pokemons?.img_3d} className='h-12'></img>

                </ul>
                <ul>
                    <a>Imagem shiny:</a>
                    <img src={pokemons?.img_shiny} className='h-12'></img>
                </ul>
                <ul className="ml-4"><a className="mr-2">Hp: </a>{pokemons?.hp}-</ul>
                <ul className="ml-4"><a className="mr-2">Atk: </a>{pokemons?.atk}</ul>
                <ul className="ml-4"><a className="mr-2">Def: </a>{pokemons?.def}-</ul>
                <ul className="ml-4"><a className="mr-2">Peso: </a>{pokemons?.peso}</ul>
                <ul className="ml-4"><a className="mr-2">Spell Atack: </a>{pokemons?.spatk}-</ul>
                <ul className="ml-4"><a className="mr-2">Spell Def: </a>{pokemons?.spdef}</ul>
                <ul className="ml-4"><a className="mr-2">Speed: </a>{pokemons?.speed}-</ul>
                <ul className="ml-4"><a className="mr-2">Evoluções: </a>{pokemons?.evolucoes}</ul>
               
                
            </div>

        </div>
    )
}
export default Dados
