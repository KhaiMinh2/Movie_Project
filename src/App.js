import './App.css';
import { useEffect, useState } from 'react';
import data1 from './movies.json'
import data2 from './casts.json'


function Header({ setDarkmode, darkmode }) {
  return (
    <>
      <div className="Header">
        <div className="left">20120134</div>
        <div className="center">Movies Info</div>
        <div className="right">
          <div>Key - API</div>
          <button onClick={() => setDarkmode(!darkmode)}>Dark mode</button>
        </div>
      </div>
    </>
  );
}

function Search({ query, setQuery, issearch, setIssearch }) {
  return (
    <>
      <div className="Search">
        <div onClick={() => setIssearch(true)} className="left">Home</div>
        <div className="right">
          <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button onClick={() => setIssearch(false)}>Search</button>
        </div>
      </div>
    </>
  );
}

function Top5Movies({ top5Movies }) {
  const [index, setIndex] = useState(0)

  let movie = top5Movies[index]
  let next = index < top5Movies.length - 1
  let pre = index > 0

  function handleNextClick() {
    if (next)
      setIndex(index + 1);
  }

  function handlePreClick() {
    if (pre)
      setIndex(index - 1);
  }
  return (
    <>
      <div className="top5">
        <button onClick={handlePreClick}> {'<'}</button>
        <div className="container">
          <img className="img1" src={movie.img} />
          <div className="dark_mode5 title">{movie.title}</div>
        </div>
        <button onClick={handleNextClick}>{'>'}</button>
      </div>
    </>
  )
}

function Top30Movies({ top30Movies }) {
  const [index, setIndex] = useState(3)

  let next = index < top30Movies.length - 1
  let pre = index - 3 > 0
  console.log(next)

  const ListTop30 = top30Movies.slice(index - 3, index).map((movie) =>
    <div key={movie.id}>
      <img className="img2"
        src={movie.img}
        alt={movie.name}
      />
    </div>
  )

  function handleNextClick() {
    if (next)
      setIndex(index + 3);
  }

  function handlePreClick() {
    if (pre)
      setIndex(index - 3);
  }
  return (
    <>
      <div className="top30">
        <button onClick={handlePreClick}> {'<'}</button>
        {ListTop30}
        <button onClick={handleNextClick}>{'>'}</button>
      </div>
    </>
  )
}

function SearchData({ movies, query }) {
  // const regex = new RegExp(query, 'i'); 
  // const results = movies.filter((movie) =>
  //   regex.test(movie.title)
  // );

  query = query.toLowerCase();
  const results = movies.filter((movie) =>
    movie.title.split(' ').some(word =>
      word.toLowerCase().startsWith(query),
    ),
  );



  return (
    <>
      <div className="sd">
        {results.map((movie) => (
          <div key={movie.id}>
            <img className="img3" src={movie.img} />
          </div>
        ))}
      </div>
    </>
  )
}


export default function App() {
  const [movies, setMovies] = useState(data1);
  const [darkmode, setDarkmode] = useState(false)
  //const [casts, setCasts] = useState(data2);
  const [query, setQuery] = useState('')
  const [issearch, setIssearch] = useState(true)

  const movie5 = [...movies];
  movie5.sort((a, b) => b.year - a.year)

  const movie30 = [...movies];
  movie30.sort((a, b) => b.ratingCount - a.ratingCount)

  const movie302 = [...movies];
  movie302.sort((a, b) => a.topRank - b.topRank)

  return (
    <html className={darkmode ? "dark_mode" : ""} >
      <body >
        <div className='App '>
          <Header setDarkmode={setDarkmode} darkmode={darkmode} />
          <Search query={query} setQuery={setQuery} issearch={issearch} setIssearch={setIssearch} />
          {issearch ? <>
            <Top5Movies top5Movies={movie5.slice(0, 5)} />
            <div className="text1">Most Popular</div>
            <Top30Movies top30Movies={movie30.slice(0, 30)} />
            <div className="text1">Top Rating</div>
            <Top30Movies top30Movies={movie302.slice(0, 30)} /> </> : 
            <><SearchData movies={movies} query={query} /></>}
        </div>
      </body>
    </html>
  );
}

