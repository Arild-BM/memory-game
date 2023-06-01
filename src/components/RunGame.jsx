// Kjører spillet
import {useEffect, useState} from "react"
import React from 'react';

import "./RunGame.css"
import GameOver1 from "./GameOver1" //Resultater ved kun 1 spiller
import GameOver from "./GameOver"   //Resultater for 2-4 spillere
import pic1 from "./data1"  //Datasett med ikoner/bilder
import pic2 from "./data2"  //Datasett med tall

let pic = pic1

function RunGame({theme, numberOfPlayers, gridSize, setCurrentPage, setColor, newgame}) {
    let array = []
    const [firstNumber, setFirstNumber] = useState(true)
    const [oldNumber, setOldNumber] = useState("")
    const [oldIndex, setOldIndex] = useState("")
    const [stateArray, setStateArray] = useState([])
    const [pairsLeft, setPairsLeft] = useState(gridSize === "4x4" ? 8 : 18)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [points, setPoints] = useState(Array(+numberOfPlayers).fill(0))
    const [moves, setMoves] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const [circleClass, setCircleClass] = useState(Array(gridSize === "4x4" ? 16 : 36).fill("cursor"))
    const [activePlayerClass, setActivePlayerClass] = useState(["player active-player", ...Array(+numberOfPlayers-1).fill("player")])

    const style6x6 = {
        gridTemplateColumns: "auto auto auto auto auto auto",
        gap: "5px"
    }

    setColor(() => "light")

    // Klokke som starter når første brikke snus hvis det er kun en spiller 
    useEffect(() => {
        let intervalId
        if (isRunning && pairsLeft) {
          // setting time every second
          intervalId = setInterval(() => setTime(time + 1), 1000)
        }
        return () => clearInterval(intervalId)
        // eslint-disable-next-line
      }, [time, isRunning])

    //   Oppsett av brikker inkl random sortering/rekkefølge
      useEffect(() => {
        if (theme === "numbers") {
            pic = pic2
        } else {
            pic = pic1
        }
        if (gridSize === "4x4") {
            // eslint-disable-next-line
            array = pic.slice(0, 8)
            array = [...array, ...array]        
        } else {
            array = [...pic, ...pic]
        }
        array.sort(function(){return 0.5 - Math.random()})
        setStateArray(() => [...array])
        // eslint-disable-next-line
      }, [newgame])

    function twoEqual(e, index) {
        // Sjekker om det er den første av 2 brikker og lagrer den første brikken
        if (firstNumber) {
            document.querySelector(".i" + index).style.animation = 'none'
            void document.querySelector(".i" + index).offsetWidth
            document.querySelector(".i" + index).style.animation = 'rotate-circle 0.3s linear forwards'
            setOldNumber(() => e)
            setOldIndex(() => index)
            setFirstNumber(() => false)
            if (numberOfPlayers === "1" && !isRunning) {
                setIsRunning(() => true)
            }
        } else {
            // Hvis det er brikke nr 2, så sammenlignes denne med den første
            // Hvis de er like, så får spilleren poeng og et nytt forsøk.
            if ((oldNumber === e) && (index !== oldIndex)) {
                setPairsLeft(prevValue => prevValue - 1)
                setMoves(prevValue => prevValue + 1)
                document.querySelector(".i" + index).style.animation = 'none'
                void document.querySelector(".i" + index).offsetWidth
                document.querySelector(".i" + index).style.animation = 'circle-found 0.6s linear forwards'
                setCircleClass(prevValues => {
                    return [
                            ...prevValues.slice(0, index),
                            "onclick-off",
                            ...prevValues.slice(index+1)
                          ]
                })
                document.querySelector(".i" + oldIndex).style.animation = 'none'
                void document.querySelector(".i" + oldIndex).offsetWidth
                document.querySelector(".i" + oldIndex).style.animation = 'circle-old-found 0.6s linear forwards'
                setCircleClass(prevValues => {
                    return [
                            ...prevValues.slice(0, oldIndex),
                            "onclick-off",
                            ...prevValues.slice(oldIndex+1)
                          ]
                })
                setFirstNumber(() => true)
                setPoints(prevValues => {
                    return [
                            ...prevValues.slice(0, currentPlayer),
                            prevValues[currentPlayer] + 1,
                            ...prevValues.slice(currentPlayer + 1)
                          ]
                })
            } else {
                // Er de to brikkene ulike går spillet over til neste spiller
                setMoves(prevValue => prevValue + 1)
                document.querySelector(".i" + index).style.animation = 'none'
                void document.querySelector(".i" + index).offsetWidth
                document.querySelector(".i" + index).style.animation = 'rotate-new-back 2s linear forwards'
                document.querySelector(".i" + oldIndex).style.animation = 'none'
                void document.querySelector(".i" + oldIndex).offsetWidth
                document.querySelector(".i" + oldIndex).style.animation = 'rotate-old-back 2s linear forwards'
                setFirstNumber(() => true)
                if (numberOfPlayers > 1) {
                    setActivePlayerClass(prevValues => {
                        return [
                                ...prevValues.slice(-1),
                                ...prevValues.slice(0, -1)
                              ]
                    })
                    setCurrentPlayer(prevValue => (prevValue + 1) === +numberOfPlayers ? 0 : prevValue + 1)
                }
            }
        }
    }


    return (
        <div>
            {/* Når det ikke er brikker igjen åpnes modal GameOver */}
            {!pairsLeft && numberOfPlayers > 1 && <GameOver
                points = {points}
                setCurrentPage = {setCurrentPage}
                setColor = {setColor}
                />}
            {/* Hvis det kun er en spiller, så åpnes GameOver1 i stedet for GameOver */}
            {!pairsLeft && (numberOfPlayers === "1") && <GameOver1
                setCurrentPage = {setCurrentPage}
                setColor = {setColor}
                time = {time}
                moves = {moves}
                />}
            {/* Header med logo og knapperad */}
            <h3>memory</h3>
            <div className = "buttons">
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
            {/* Grid med 16 eller 36 brikker */}
            <div>
                <div className = "grid"
                    style = {gridSize === "6x6" ? style6x6 : null}
                    >
                    {stateArray.map((e, index) => <img
                        className = {`i${index} ${circleClass[index]}`}
                        key = {index}
                        src = {process.env.PUBLIC_URL + "/" + e}
                        alt = {e.replace("pictures/","").replace(".svg","")}
                        onClick={() => twoEqual(e, index)}
                        ></img>)}
                </div>
                {/* Footer som viser hvilken spiller som er aktiv hvis det er 2-3 spillere */}
                {numberOfPlayers > 1 ? (
                <div className = "player-line">
                    {points.map((e, index) => {
                        return (
                        <div className = {`${activePlayerClass[index]}`}
                            key = {index}
                        >
                            <h3>Player {index+1}</h3>
                            <h3>{e}</h3>
                        </div>
                    )})}
                </div>
                ) : (
                    // Footer som viser tid og antall trekk hvis det kun er en spiller
                    <div className = "player-line">
                        <div className="player">
                            <h3>Time</h3>
                            <h3>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2,"0")}</h3>
                        </div>
                        <div className="player">
                            <h3>Moves</h3>
                            <h3>{moves}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
        )
}

export default RunGame
    