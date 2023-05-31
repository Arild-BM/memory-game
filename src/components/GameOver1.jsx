import "./GameOver.css"

function GameOver({setCurrentPage, setColor, time, moves}) {

      
    return (
        <div>
        <div className = "darken-background"></div>
        <div className = "winner">
            <h1 className = "winner-name">You did it!</h1>
            <h4>Game over! Here's how you got on...</h4>
            <div className = "result-page result-page-top">
                <div className = "result-page">
                    <div className = "result-line no-winner">
                        <h3>Time Elapsed</h3>
                        <h3>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2,"0")}</h3>
                    </div>
                    <div className = "result-line no-winner">
                        <h3>Moves Taken</h3>
                        <h3>{moves}</h3>
                    </div>
                </div>
                <div className = "result-page">
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
        </div>
    )
}

export default GameOver