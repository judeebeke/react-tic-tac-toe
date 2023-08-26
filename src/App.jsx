import React, { useState } from "react";
import Boxes from "./components/Boxes";
import BoxData from "./components/BoxData";
import Button from "./components/UI/Button";
import "./index.css";

const App = () => {
  const [box, setBox] = useState(BoxData);
  const [currentValue, setCurrentValue] = useState("X");
  const [userWin, setUserWin] = useState(false);
  const [isXUserWin, setIsXUserWin] = useState(0);
  const [isOUserWin, setIsOUserWin] = useState(0);
  const [isGameover, setIsGameover] = useState(false);
  const [isGameWinner, setIsGameWinner] = useState(null);

  const possibleJackpot = (id) => {
    let currentMatrix = [];
    let matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    currentMatrix = matrix.filter((number) => number.includes(id));

    return currentMatrix;
  };

  const checkJakpotHandler = (boxes, chances, value) => {
    let jackpot = [];
    for (let i of chances) {
      let checker = boxes.filter((item) => {
        if (i.includes(item.id) && item.value === value) {
          return true;
        } else {
          return false;
        }
      });

      if (checker.length === 3) {
        setUserWin(true);
        setIsGameover(true);
        for (let i of checker) {
          setBox((prev) => {
            let newBoxes = prev.map((item) => {
              if (item.id === i.id) {
                return { ...item, jackpot: true };
              } else {
                return { ...item, open: false };
              }
            });
            return newBoxes;
          });
        }
        
          if(checker[0].value === 'X') {
            setIsXUserWin(prev => prev + 1)
          } else {
            setIsOUserWin(prev => prev + 1)
          }
        jackpot = checker;
        return;
      }
    }

    return jackpot;
  };

  const setBoxValueHandler = (id) => {
    let checkJackpotBoxes = possibleJackpot(id);
    setBox((prev) => {
      let newBoxes = prev.map((item) => {
        if (item.id === id) {
          return { ...item, value: currentValue, open: false };
        } else {
          return item;
        }
      });

      checkJakpotHandler(
        newBoxes,
        checkJackpotBoxes,
        currentValue
      );

      setCurrentValue((prev) => {
        if (currentValue === "X") {
          return "O";
        } else {
          return "X";
        }
      });

      return newBoxes;
    });
  };

  const resetSubHandler = () => {
    setBox(prev => {
       const getBox = prev.map(item => {
         return {...item, value:'', open: true, jackpot: false}
       });
       setIsGameover(false)
       setUserWin(false)
       setCurrentValue('X')
       setIsGameWinner(null)
       return getBox;
       })

   };

   const endGameHandler = () => {
    setBox(prev => {
       const getBox = prev.map(item => {
         return {...item, value:'', open: false, jackpot: false}
       });
       setIsGameover(false)
       setUserWin(false)
       setCurrentValue('X')
       setIsXUserWin(0)
      setIsOUserWin(0)
       return getBox;
       })
       if(isXUserWin / 2 > isOUserWin / 2) {
         setIsGameWinner("X")
       } else {
        setIsGameWinner("O")
       }
   };

  return (
    <section id="game-container">
      <header className="header">
        <h3>TIC TAC TOE</h3>
        <div className="scores">
          <h4>Player X </h4>
          <span>{isXUserWin}</span>:<span> {isOUserWin}</span> <h4>Player O</h4>
          <br />
        </div>
          {isGameWinner && <p style={{fontWeight: "bold", color: "#fff"}}><strong>Player {isGameWinner} is the winner!</strong></p>}
      </header>
      <div className="btn-cont">
        <Button text="Reset" onBtnClick={resetSubHandler} />
        <Button text="End Game" onBtnClick={endGameHandler} />
      </div>
      <Boxes
        boxes={box}
        setBoxValue={setBoxValueHandler}
        isJackpot={userWin}
        gameover={isGameover}
      />
    </section>
  );
};

export default App;
