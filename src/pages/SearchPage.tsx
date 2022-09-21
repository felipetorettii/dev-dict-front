import { HomeSearch } from "../components/HomeSearch"
import { Logo } from "../components/Logo"

export function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo/>
      <HomeSearch/>
    </div>
  ) 
}