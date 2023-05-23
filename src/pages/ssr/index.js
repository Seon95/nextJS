import React from "react";
import Link from "next/link";
import { slug } from "@/helpers";
const index = ({ cocktails }) => {
  return (
    <div>
      <h1>Retrieving cocktails with SERVER Side Rendering</h1>
      <h2>CONTRA</h2>
      <ol>
        <li>if cokctailapi down: no cocktails</li>
        <li>10000 users: 10000 api calls(no caching)</li>
      </ol>
      <h2>PRO</h2>
      <ol>
        <li>no loading ui</li>
        <li>the fetch is handled by server(vercel) and is faster</li>
        <li>SEO!!! PAGE GOT ALL THE HTML on pageload</li>
      </ol>
      <div className="cocktails">
        {cocktails.map(({ idDrink, strDrinkThumb, strDrink }) => (
          <article key={idDrink}>
            <Link href={`/ssr/detail/${idDrink}-${slug(strDrink)}`}>
              <img src={strDrinkThumb} alt={strDrink} />
              <p>{strDrink}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  );
  const { drinks: cocktails } = await response.json();
  return {
    props: {
      cocktails,
    },
  };
}

export default index;
