import { Logo } from "./components/Logo"

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo/>
      <input type="text" className="input-search"/>
      <div>
        <input type="button" className="button-search" value="Pesquisar"/>
      </div>
    </div>
  ) 
}
  
export default App
  