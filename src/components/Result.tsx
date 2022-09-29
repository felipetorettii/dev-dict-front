import { useState } from "react";
import { useLocation } from "react-router-dom";
import doSearchRequest from "../services/SearchService";
import { LogoNoDots } from "./LogoNoDots";
import { SearchInput } from "./SearchInput";

interface Result {
  Description?: string
  Title?: string
  Link?: string
}

export function Result() {
  const { state } = useLocation();
  const [text, setText] = useState(state.text);
  const [results, setResults] = useState<Result[]>(state.results)

  const refreshResults = () => {
    doSearchRequest(text).then(data => {
      setResults(data);
    })
  }

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
          {results.map(res => {
            return (
              <li key={res.Title}>
                <a className="text-[#1a0dab] hover:underline visited:text-[#681da8]" href={res.Link}>
                  <h3 className="text-xl">{res.Title}</h3>
                </a>
                <p>{res.Description}</p>
                <br></br>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}