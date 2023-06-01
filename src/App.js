import { useState } from "react"
import StartPage from "./components/StartPage"
import RunGame from "./components/RunGame"
import RestartGame from "./components/RestartGame"


function App() {

  const [currentPage, setCurrentPage] = useState("startPage")
  const [theme, setTheme] = useState("numbers")
  const [numberOfPlayers, setNumberOfPlayers] = useState("1")
  const [gridSize, setGridSize] = useState("4x4")
  const [color, setColor] = useState("dark")
  const [newgame, setNewgame] = useState (0)

  document.documentElement.className = color

  return (
    <div className="App">
      {currentPage === "startPage"
      && <StartPage 
        theme = {theme}
        setTheme = {setTheme}
        color = {color}
        numberOfPlayers = {numberOfPlayers}
        setNumberOfPlayers = {setNumberOfPlayers}
        gridSize = {gridSize}
        setGridSize = {setGridSize}
        setCurrentPage = {setCurrentPage}
        setNewgame = {setNewgame}
      />}
      {currentPage === "runGame"
      && <RunGame 
        theme = {theme}
        numberOfPlayers = {numberOfPlayers}
        gridSize = {gridSize}
        setCurrentPage = {setCurrentPage}
        setColor = {setColor}
        newgame = {newgame}
      />}
      {currentPage === "restartGame" 
      && <RestartGame 
        setCurrentPage = {setCurrentPage}
      />}
    </div>
  );
}

export default App;
