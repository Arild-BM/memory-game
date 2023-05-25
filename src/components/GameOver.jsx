import "./GameOver.css"

function GameOver({points}) {
    
    return (
        <div className = "winner">
            <h1 className = "winner-name">{points[0] === points[1] ? "It's a tie!" : "Player 3 Wins!"}</h1>
            <h4>Game over! Here are the results...</h4>
            {points.map((point, index) => {
                        return (
                        <div className = {index === 0 ? "result-line" : index > 0 && point === points[0] ? "result-line" : "result-line no-winner"}>
                            <h3>Player {index+1}</h3>
                            <h3>{point}</h3>
                        </div>
                    )})}
        </div>
        
    )
}

export default GameOver