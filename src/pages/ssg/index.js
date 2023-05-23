import React from "react";
import Link from "next/link";
import { slug } from "@/helpers";
const index = ({ cocktails }) => {
  return (
    <div>
      <h1>Retrieving cocktails with Static Site Generation</h1>
      <h2>CONTRA</h2>
      <ol>
        <li>data could be old</li>
        <li>missing new data</li>
      </ol>
      <h2>PRO</h2>
      <ol>
        <li>Data is retrieved only once (after build)</li>
        <li>100% cached except for images</li>
        <li>speed</li>
        <li>if api down then still cocktails</li>
        <li>SEO</li>
      </ol>
      <div className="cocktails">
        {cocktails.map(({ idDrink, strDrinkThumb, strDrink }) => (
          <article key={idDrink}>
            <Link href={`/ssg/detail/${idDrink}-${slug(strDrink)}`}>
              <img src={strDrinkThumb} alt={strDrink} />
              <p>{strDrink}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
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
