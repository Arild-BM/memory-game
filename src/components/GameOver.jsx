import "./GameOver.css"

function GameOver({points, setCurrentPage, setColor}) {

    
    let results = []
    points.map((value, index) => results[index] = ["Player " + (index + 1), value]);
    results.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    return (
        <div>
        <div className = "darken-background"></div>
        <div className = "winner">
            <h1 className = "winner-name">{results[0][1] === results[1][1] ? "It's a tie!" : results[0][0]+" Wins!"}</h1>
            <h4>Game over! Here are the results...</h4>
            {results.map((point, index) => {
                        return (
                        <div className = {index === 0 ? "result-line" : index > 0 && point[1] === results[0][1] ? "result-line" : "result-line no-winner"}>
                            <h3>{point[0]}</h3>
                            <h3>{point[1] === 1 ? point[1] + " pair" : point[1] + " pairs"}</h3>
                        </div>
                    )})}
            <div className = "buttons buttons-winnerpage">
                <h3 className = "run-game-button"
                onClick = {() => {
                    setCurrentPage(() => "restartGame")
                }}>Restart</h3>
                <h3 className = "run-game-button"
                onClick = {() => {
                    setCurrentPage(() => "startPage")
                    setColor(() => "dark")
                }}>New Game</h3>
            </div>
        </div>
        </div>
    )
}

export default GameOver