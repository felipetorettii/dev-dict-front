import { useState } from 'react';
import AxiosHandler from '../services/AxiosHandler';

interface Result {
  Description?: string
  Title?: string
  Link?: string
}

export function HomeSearch() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<Result[]>([])
  const URL = "search?query=$text$&start=0"

  const doSearch = async () => {
    const searchUrl = URL.replace("$text$", text);
    AxiosHandler.get(searchUrl).then((response) => { 
      setResult(response.data);
      console.log(result);
    });
  }

  return (
    <>
      <input type="text" className="input-search" value={text} onChange={(e) => setText(e.target.value)}/>
      <div>
        <input type="button" onClick={doSearch} className="button-search" value="Pesquisar"/>
      </div>
    </>
  )
  
}

