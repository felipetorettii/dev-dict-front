import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Result {
  Description?: string
  Title?: string
  Link?: string
}

export function Result() {
  const { state } = useLocation();
  const [results, setResults] = useState<Result[]>([])

  setResults(state);

  debugger;

  return (
    <>
      <ul>
        {results.map(res => {
          return (
            <>
              <a href={res.Link}>{res.Title}</a>
              <p>{res.Description}</p>
              <br></br>
            </>
          )
        })}
      </ul>
    </>
  )
}

