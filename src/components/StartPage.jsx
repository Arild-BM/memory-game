import './StartPage.css';

function StartPage({theme, setTheme, numberOfPlayers, setNumberOfPlayers,
    gridSize, setGridSize, setCurrentPage }) {
    
    

    return (
        <div className='main'>
            <h1>memory</h1>
            <div className = "selections-frame">
                <h2>Select Theme</h2>
                <div className = "button-line">
                    <h3 className = {theme === "numbers" ? "button numbers selected" : "button numbers"}
                        onClick = {() => {
                            setTheme(() => "numbers")
                            document.querySelector(".numbers").classList.add("selected")
                            document.querySelector(".icons").classList.remove("selected")
                        }}
                    >Numbers</h3>
                    <h3 className = {theme === "icons" ? "button icons selected" : "button icons"}
                        onClick = {() => {
                            setTheme(() => "icons")
                            document.querySelector(".icons").classList.add("selected")
                            document.querySelector(".numbers").classList.remove("selected")
                        }}
                    >Icons</h3>
                </div>
                <h2>Number of Players</h2>
                <div className = "button-line numbers">
                <h3 className = {numberOfPlayers === "1" ? "button number1 selected" : "button number1"}
                    onClick = {() => {
                        setNumberOfPlayers(() => "1")
                        document.querySelector("div.numbers > .selected").classList.remove("selected")
                        document.querySelector(".number1").classList.add("selected")
                    }}
                    >1</h3>
                    <h3 className = {numberOfPlayers === "2" ? "button number2 selected" : "button number2"}
                    onClick = {() => {
                        setNumberOfPlayers(() => "2")
                        document.querySelector("div.numbers > .selected").classList.remove("selected")
                        document.querySelector(".number2").classList.add("selected")
                    }}
                    >2</h3>
                    <h3 className = {numberOfPlayers === "3" ? "button number3 selected" : "button number3"}
                    onClick = {() => {
                        setNumberOfPlayers(() => "3")
                        document.querySelector("div.numbers > .selected").classList.remove("selected")
                        document.querySelector(".number3").classList.add("selected")
                    }}
                    >3</h3>
                    <h3 className = {numberOfPlayers === "4" ? "button number4 selected" : "button number4"}
                    onClick = {() => {
                        setNumberOfPlayers(() => "4")
                        document.querySelector("div.numbers > .selected").classList.remove("selected")
                        document.querySelector(".number4").classList.add("selected")
                    }}
                    >4</h3>
                </div>
                <h2>Grid Size</h2>
                <div className = "button-line">
                <h3 className = {gridSize === "4x4" ? "button x4 selected" : "button x4"}
                    onClick = {() => {
                        setGridSize(() => "4x4")
                        document.querySelector(".x4").classList.add("selected")
                        document.querySelector(".x6").classList.remove("selected")
                    }}
                    >4 x 4</h3>
                    <h3 className = {gridSize === "6x6" ? "button x6 selected" : "button x6"}
                    onClick = {() => {
                        setGridSize(() => "6x6")
                        document.querySelector(".x6").classList.add("selected")
                        document.querySelector(".x4").classList.remove("selected")
                    }}
                    >6 x 6</h3>
                </div>
                <h3 className = "button start-game"
                onClick = {() => {
                    setCurrentPage(() => "runGame")
                }}
                >Start Game</h3>
            </div>
        </div>


    )
}

export default StartPage