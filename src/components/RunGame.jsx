import "./RunGame.css"
import pic from "./data"

function RunGame({theme, numberOfPlayers,
    gridSize, setCurrentPage }) {

        return (
            <div>
                <h1>TEST5</h1>
                <div className = "grid">
                    {pic.map((e, index) => <img
                        key = {index}
                        src = {e}
                        alt = {e.replace("pictures/","").replace(".svg","")}
                        
                    ></img>)}
                </div>
                <h2>{theme}</h2>
                <h2>{numberOfPlayers}</h2>
                <h2>{gridSize}</h2>
            </div>
        )
}

export default RunGame
    