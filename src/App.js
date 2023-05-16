import { useState } from "react"
import StartPage from "./components/StartPage"
import RunGame from "./components/RunGame"
import './App.css';


function App() {

  const [currentPage, setCurrentPage] = useState("startPage")
  const [theme, setTheme] = useState("numbers")
  const [numberOfPlayers, setNumberOfPlayers] = useState("1")
  const [gridSize, setGridSize] = useState("4x4")

  return (
    <div className="App">
      {currentPage === "startPage"
      && <StartPage 
        theme = {theme}
        setTheme = {setTheme}
        numberOfPlayers = {numberOfPlayers}
        setNumberOfPlayers = {setNumberOfPlayers}
        gridSize = {gridSize}
        setGridSize = {setGridSize}
        setCurrentPage = {setCurrentPage}
      />}
      {currentPage === "runGame"
      && <RunGame 
        theme = {theme}
        numberOfPlayers = {numberOfPlayers}
        gridSize = {gridSize}
        setCurrentPage = {setCurrentPage}
      />}
    </div>
  );
}

export default App;
