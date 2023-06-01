// Restarter spillet
function RestartGame({setCurrentPage}) {

    return (
        <h3 onClick = {setCurrentPage(() => "runGame")}>Restart Game</h3>
    )
}

export default RestartGame