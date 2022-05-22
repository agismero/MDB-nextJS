import axios from "axios";

const Detail = ({ movie: { backdrop_path, original_title, overview } }) => {
  return (
    <>
      <h1>Movie detail</h1>
      {
        <>
          <main>
            <article>
              <img
                src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                alt=""
              />
              <h2>{original_title}</h2>
              <p>{overview}</p>
            </article>
          </main>
        </>
      }
    </>
  );
};

export const getStaticPaths = async () => {
  const {
    data: { results: popularMovies },
  } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=7278636ea221a54a9f8fe03a2b4a4eb7&language=en-US&page=1`
  );
  return {
    paths: popularMovies.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const {
    params: { id },
  } = ctx;
  const { data: movie } = await axios(
    `https://api.themoviedb.org/3/movie//${id}?api_key=7278636ea221a54a9f8fe03a2b4a4eb7&language=en-US`
  );
  return {
    props: {
      movie,
    },
    revalidate: 60 * 60,
  };
};

export default Detail;
