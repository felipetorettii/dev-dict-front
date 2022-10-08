export function SearchInput({value, handleOnChange, doSearchKeyFunction} : any) {

  const doSearchKey = async (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await doSearchKeyFunction();      
    }
  }

  return (
    <input type="text" className="input-search" value={value} onChange={(e) => handleOnChange(e.target.value)} onKeyDown={doSearchKey}/>
  )
}