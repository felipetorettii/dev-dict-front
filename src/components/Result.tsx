import { useState } from "react";
import { useLocation } from "react-router-dom";
import doSearchRequest from "../services/SearchService";
import { LogoNoDots } from "./LogoNoDots";
import { SearchInput } from "./SearchInput";
import InfiniteScroll from 'react-infinite-scroll-component';

interface Result {
  Description?: string
  Title?: string
  Link?: string
}

export function Result() {
  const { state } = useLocation();
  const [text, setText] = useState(state.text);
  const [results, setResults] = useState<Result[]>(state.results);
  const [page, setPage] = useState(state.page);

  const refreshResults = async () => {
    let newResults : Result[] = [];
    let newPage = 0;
    while (newResults.length < 20) {
      const response = await doSearchRequest(text, newPage);
      newResults = newResults.concat(response);
      newPage += 10;
    }
    setResults(newResults);
    setPage(newPage);
  }

  const getMoreResults = async () => {
    try {
      setPage(page+10);
      const newResults = await doSearchRequest(text, page);
      setResults(results.concat(newResults));
    } catch (err) {}
  };

  return (
    <div className="mt-2">
      <div className="dashed pb-4">
        <div className="flex ml-8">
          <a href="/" className="mr-10"> 
            <LogoNoDots/>
          </a>
          <div className="mt-1">
            <SearchInput value={text} handleOnChange={setText} doSearchKeyFunction={refreshResults}/>  
          </div>
        </div>
      </div>
      <div className="dashed"></div>
      <div className="ml-64 mt-4">
        <ul>
          <InfiniteScroll
            dataLength={results.length}
            next={getMoreResults}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            >
            {results.map((res, index) => {
              return (
                <li key={index}>
                  <a className="text-[#1a0dab] hover:underline visited:text-[#681da8] w-fit text-xl" href={res.Link}>
                    {res.Title}
                  </a>
                  <p>{res.Description}</p>
                  <br></br>
                </li>
              )
            })}
          </InfiniteScroll>
        </ul>
      </div>
    </div>
  )
}