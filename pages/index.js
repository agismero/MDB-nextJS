import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Index = ({ popularMovies }) => {
  return (
    <>
      {popularMovies && (
        <section className="movieGrid">
          {popularMovies.map(({ id, original_title, backdrop_path }) => (
            <Link key={id} href={`/movie/${id}`}>
              <article>
                <a>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                    alt={original_title}
                  />
                  <p>{original_title}</p>
                </a>
              </article>
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const {
    data: { results: popularMovies },
  } = await axios(
    "https://api.themoviedb.org/3/movie/popular?api_key=7278636ea221a54a9f8fe03a2b4a4eb7&language=en-US&page=1"
  );
  return {
    props: {
      popularMovies,
    },
  };
};

export default Index;
