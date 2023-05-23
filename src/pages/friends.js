import db from "@/db";
import { nest } from "@/helpers";
import { useState } from "react";

const Friends = ({ friends }) => {
  const [input, setInput] = useState("");
  const [area, setArea] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        message: area,
      }),
    });
    setInput("");
    setArea("");
  };
  return (
    <div>
      <h1>Data from mysql</h1>
      <div>
        {friends.map(({ id, name, age, hobbies }) => (
          <details key={id}>
            <summary>
              {name} - {age}
            </summary>
            <ul>
              {hobbies.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <div>
        <h1>Mailform using embedded nextjs api</h1>
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            name="subject"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />{" "}
          <br />
          <textarea
            name="message"
            onChange={(e) => setArea(e.target.value)}
            value={area}
          ></textarea>{" "}
          <br />
          <input type="submit" value="sendmail" />
        </form>
      </div>
    </div>
  );
};

export default Friends;

export async function getStaticProps() {
  const friendsData = await db("friends_has_hobbies")
    .join("friends", "friends.id", "friends_has_hobbies.friends_id")
    .join("hobbies", "hobbies.id", "friends_has_hobbies.hobbies_id")
    .select(
      "friends.id",
      "friends.name",
      "friends.age",
      "friends.image",
      "hobbies.hobby",
      "hobbies.id AS hobbyId"
    );

  const friendsDefinition = [
    {
      id: { column: "id", type: "NUMBER" },
      name: "name",
      age: { column: "age", type: "NUMBER" },
      image: "image",
      hobbies: [
        {
          id: { column: "hobbyId", type: "NUMBER" },
          name: "hobby",
        },
      ],
    },
  ];
  // console.log(friendsData);
  const friends = nest(friendsData, friendsDefinition);
  // console.log(friends);

  // const friends = (await db.select("*").from("friends"));
  // const friendsWithHobbies = await Promise.all(
  //   friends.map(async (f) => ({
  //     ...f,
  //     hobbies: await db("friends_has_hobbies")
  //       .join("hobbies", "hobbies.id", "friends_has_hobbies.hobbies_id")
  //       .select("hobbies.hobby", "hobbies.id")
  //       .where("friends_has_hobbies.friends_id", f.id),
  //   }))
  // );

  // const friends = await db
  // .select(
  //   'f.id',
  //   'f.name',
  //   'f.age',
  //   db.raw(
  //     'JSON_ARRAYAGG(JSON_OBJECT("id",h.id, "hobby", h.hobby)) as hobbies'
  //   )
  // )
  // .from('friends as f')
  // .leftJoin('friends_has_hobbies as fh', 'f.id', '=', 'fh.friends_id')
  // .leftJoin('hobbies as h', 'h.id', '=', 'fh.hobbies_id')
  // .groupBy('f.id');

  // console.log(friendsWithHobbies);

  return {
    props: {
      friends,
    },
    revalidate: 60,
  };
}
