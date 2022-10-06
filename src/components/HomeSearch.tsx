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
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const doSearch = async () => {
    let results : Result[] = [];
    let page = 0;
    while (results.length < 20) {
      const response = await doSearchRequest(text, page);
      results = results.concat(response);
      page += 10;
    }
    navigate("/results", { state : { results, text, page} });
    
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

