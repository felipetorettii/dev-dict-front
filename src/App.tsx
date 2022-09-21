import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ResultsPage } from "./pages/ResultsPage";
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/results" element={<ResultsPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
  
export default App
  