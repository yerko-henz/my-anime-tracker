import React, { useEffect, useState } from "react";
import { useQuery, gql, fromPromise } from "@apollo/client";
import { useSelector } from "react-redux";

const SEARCH_RESULTS = gql`
  query ($search: String) {
    Page {
      media(search: $search) {
        id
        title {
          romaji
        }
      }
    }
  }
`;

const MyAnime = () => {
  const [search, setSearch] = useState("");

  const myAnime = useSelector((state) => state.myAnime.list);

  const { loading, error, data } = useQuery(SEARCH_RESULTS, {
    variables: { search },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    console.log("d", data, "search", search);
  }, [data]);

  useEffect(() => {
    console.log("afas", myAnime);
  }, [myAnime]);

  useEffect(() => {
    console.log("all local storage", { ...localStorage });
  }, []);

  if (error) return console.log(error);

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          {data.Page.media.length > 0 && (
            <div>
              <h3>Results:</h3>
              <ul>
                {data.Page.media.map((anime) => (
                  <li key={anime.id}>{anime.title.romaji}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      <ul>
        {myAnime.map((m) => (
          <li key={m.id}>{m.title.romaji}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyAnime;
