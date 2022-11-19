import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import doSearchRequest from '../services/SearchService';
import { SearchInput } from './SearchInput';
import ReactLoading from 'react-loading';

interface Result {
  OriginalDescription?: string
  Description?: string
  Title?: string
  OriginalTitle?: string
  Link?: string
}

interface Page {
  results?: Result[]
  total?: string
}

export function HomeSearch() {
  const [text, setText] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);
  const navigate = useNavigate();

  const doSearch = async () => {
    if (text.length === 0) return;
    setLoadingResults(true);
    let results : Result[] = [];
    let page = 0;
    let total = "";
    while (results.length < 20) {
      const response = await doSearchRequest(text, page);
      page += 10;
      if (response == null) {
        continue;
      }
      results = results.concat(response.Sites);
      total = response.Total
    }
    navigate("/results", { state : { results, text, page, total} });
    
  }

  return (
    <>
      {loadingResults ? 
        <div className="loading-component">
          <ReactLoading type="bubbles" color="#e5e7eb" height="5%" width="5%"/>
        </div> : 
        <>
          <SearchInput value={text} handleOnChange={setText} doSearchKeyFunction={doSearch}/>
          <div>
            <input type="button" onClick={doSearch} className="button-search" value="Pesquisar"/>
          </div>
        </>
      }
    </>
  )
  
}

