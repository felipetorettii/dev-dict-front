import { useState } from "react";
import { useLocation } from "react-router-dom";
import doSearchRequest from "../services/SearchService";
import { LogoNoDots } from "./LogoNoDots";
import { SearchInput } from "./SearchInput";
import InfiniteScroll from 'react-infinite-scroll-component';
import loading from '../assets/loading.gif'
import './Result.css'

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
  const initialText = state.text;

  const refreshResults = async () => {
    if (text.length === 0) return;
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
      const newResults = await doSearchRequest(initialText, page);
      setResults(results.concat(newResults));
    } catch (err) {}
  };

  const getHostWithProtocol = (link: string) : string => {
    const linkUrl = new URL(link);
    return `${linkUrl.protocol}//${linkUrl.host}`
  }

  const getTranslatedPage = (link : string) : string => {
    return `https://translate.google.com/translate?hl=pt-BR&sl=en&u=${link}`
  }

  return (
    <div className="mt-2">
      <div className="dashed pb-4">
        <div className="flex ml-8">
          <a href="/" className="mr-10"> 
            <LogoNoDots/>
          </a>
          <div style={{minWidth: "448px", marginTop: "0.25rem"}}>
            <SearchInput value={text} handleOnChange={setText} doSearchKeyFunction={refreshResults}/>
          </div>
        </div>
      </div>
      <div className="dashed"></div>
      <div className="center_col">
        <ul>
          <InfiniteScroll
            dataLength={results.length}
            next={getMoreResults}
            hasMore={true}
            loader={<img className="w-20 h-20" src={loading} alt="loading..."/>}
            >
            {results.map((res, index) => {
              return (
                <li key={index}>
                  <cite role="text" className="cite-host">{getHostWithProtocol(res.Link || "")}
                    <span role="text"> › ...</span>
                    <a className="anchor-translated" href={getTranslatedPage(res.Link || "")}>Ver página traduzida</a>
                  </cite>
                  <br/>
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