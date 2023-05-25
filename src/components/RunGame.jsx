import {useEffect, useState} from "react"
import React from 'react';

import "./RunGame.css"
import GameOver from "./GameOver"
import pic1 from "./data1"
import pic2 from "./data2"

let pic = pic1

function RunGame({theme, numberOfPlayers, gridSize, setCurrentPage, setColor}) {
    let array = []
    let firstNumber = true
    let oldNumber = ""
    let oldIndex = ""
    const [pairsLeft, setPairsLeft] = useState(gridSize === "4x4" ? 8 : 18)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [points, setPoints] = useState(Array(+numberOfPlayers).fill(0))
    const [moves, setMoves] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const [circleClass, setCircleClass] = useState(Array(gridSize === "4x4" ? 16 : 36).fill("cursor"))
    const [activePlayerClass, setActivePlayerClass] = useState(["player active-player", ...Array(+numberOfPlayers-1).fill("player")])
    const [gameOver, setGameOver] = useState(false)

    const style6x6 = {
        gridTemplateColumns: "auto auto auto auto auto auto",
        gap: "5px"
    }

    setColor(() => "light")

    useEffect(() => {
        let intervalId;
        if (isRunning) {
          // setting time every second
          intervalId = setInterval(() => setTime(time + 1), 3000)
        }
        return () => clearInterval(intervalId)
      }, [isRunning, time])

    function twoEqual(e, index) {
        if (firstNumber) {
            document.querySelector(".i" + index).style.animation = 'none'
            void document.querySelector(".i" + index).offsetWidth
            document.querySelector(".i" + index).style.animation = 'rotate-circle 0.3s linear forwards'
            oldNumber = e
            oldIndex = index
            firstNumber = false
            if (numberOfPlayers === "1" && !isRunning) {
                setIsRunning(() => true)
            }
        } else {
            if (oldNumber === e) {
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
                firstNumber = true
                setPoints(prevValues => {
                    return [
                            ...prevValues.slice(0, currentPlayer),
                            prevValues[currentPlayer] + 1,
                            ...prevValues.slice(currentPlayer + 1)
                          ]
                })
            } else {
                setMoves(prevValue => prevValue + 1)
                document.querySelector(".i" + index).style.animation = 'none'
                void document.querySelector(".i" + index).offsetWidth
                document.querySelector(".i" + index).style.animation = 'rotate-new-back 2s linear forwards'
                document.querySelector(".i" + oldIndex).style.animation = 'none'
                void document.querySelector(".i" + oldIndex).offsetWidth
                document.querySelector(".i" + oldIndex).style.animation = 'rotate-old-back 2s linear forwards'
                firstNumber = true
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
    
    if (theme === "numbers") {
        pic = pic2
    }
    if (gridSize === "4x4") {
        array = pic.slice(0, 8)
        array = [...array, ...array]        
    } else {
        array = [...pic, ...pic]
    }
    // array.sort(function(){return 0.5 - Math.random()})
    
    
    return (
        <div>
            {gameOver && <GameOver points = {points}/>}
            <div className = "header">
            <h3>memory</h3>
            <div className = "buttons">
                <h3 className = "run-game-button"
                onClick = {() => {
                    setCurrentPage(() => "restartGame")
                }}>Restart</h3>
                <h3 className = "run-game-button"
                    onClick = {() => {
                        setGameOver((prevValue) => !prevValue)
                    }}>TEST</h3>
                <h3 className = "run-game-button"
                onClick = {() => {
                    setCurrentPage(() => "startPage")
                    setColor(() => "dark")
                }}>New Game</h3>
            </div>
            </div>
            <div>
                <div className = "grid"
                    style = {gridSize === "6x6" ? style6x6 : null}
                    >
                    {array.map((e, index) => <img
                        className = {`i${index} ${circleClass[index]}`}
                        key = {index}
                        src = {process.env.PUBLIC_URL + "/" + e}
                        alt = {e.replace("pictures/","").replace(".svg","")}
                        onClick={() => twoEqual(e, index)}
                        ></img>)}
                </div>
                {numberOfPlayers > 1 ? (
                <div className = "player-line">
                    {points.map((e, index) => {
                        return (
                        <div className = {`${activePlayerClass[index]}`}>
                            <h3>Player {index+1}</h3>
                            <h3>{e}</h3>
                        </div>
                    )})}
                </div>
                ) : (
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
            <h2 className = "player-line">Pairs left: {pairsLeft}</h2>
        </div>
        )
}

export default RunGame
    