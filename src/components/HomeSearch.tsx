import { useState } from 'react';
import AxiosHandler from '../services/AxiosHandler';
import { useNavigate } from "react-router-dom";

interface Result {
  Description?: string
  Title?: string
  Link?: string
}

export function HomeSearch() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<Result[]>([])
  const URL = "search?query=$text$&start=0"
  const navigate = useNavigate();

  const doSearch = async () => {
    const searchUrl = URL.replace("$text$", text);
    AxiosHandler.get(searchUrl).then((response) => { 
      setResult(response.data);
      navigate("/results", { state : { results : response.data } });
    });
  }

  const doSearchKey = async (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await doSearch();      
    }
  }

  return (
    <>
      <input type="text" className="input-search" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={doSearchKey}/>
      <div>
        <input type="button" onClick={doSearch} className="button-search" value="Pesquisar"/>
      </div>
    </>
  )
  
}

