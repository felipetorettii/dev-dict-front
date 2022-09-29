import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import doSearchRequest from '../services/SearchService';
import { SearchInput } from './SearchInput';


interface Result {
  Description?: string
  Title?: string
  Link?: string
}

export function HomeSearch() {
  const [results, setResults] = useState<Result[]>([])
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const doSearch = async () => {
    doSearchRequest(text).then(data => {
      setResults(data);
      navigate("/results", { state : { results : data, text} });
    })
  }

  return (
    <>
      <SearchInput value={text} handleOnChange={setText} doSearchKeyFunction={doSearch}/>
      <div>
        <input type="button" onClick={doSearch} className="button-search" value="Pesquisar"/>
      </div>
    </>
  )
  
}

