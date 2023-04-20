import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PC() {
  const [allGames, setGames] = useState([]);
  const options = {
    method: 'GET',
    params: {platform: 'pc'},
    headers: {
          'X-RapidAPI-Key': '620a167456mshdfb6e2440b7333ap12704cjsnf0a180a0a8a6',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }}
  async function getallGamess(categoryName) {
    let { data } = await axios.get( `https://free-to-play-games-database.p.rapidapi.com/api/games`,options);
    console.log(data);
    setGames(data);
  }

  useEffect(() => {
    getallGamess();
  },[]);

  return (
    <>
      <div className="row">
        {allGames.map((game) => {
          return (
            <div className="col-md-2 p-2  " key={game.id}>
              <div className="game h-100 d-flex flex-column">
                {" "}
                <Link
                  to={`/games/${game._id}`}
                  className=" text-decoration-none"
                >
                  {" "}
                  <img src={game.thumbnail} className="w-100" alt="" />
                  <p className=" text-main">
                    {game.title}
                  </p>
                  <p className="card-text ">{ game.short_description.split(" ").slice(0,6).join(" ")+ "..."}</p>
                </Link>
              
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
