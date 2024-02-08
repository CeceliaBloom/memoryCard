import React, {useState,useEffect} from "react";
import './App.css'

const App = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [seenColors, setSeenColors] = useState([]);
  const [questionColor, setQuestionColor] = useState("");
  
  useEffect(() => {
      generateNewQuestion();
  }, [currentScore, bestScore]);
  
  const generateNewQuestion = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setQuestionColor(randomColor);
    console.log("New question color:", randomColor);

  };

  const handleButtonClick = (answer) => {
    console.log("Clicked:", answer);
  
    if ((answer === "Yes" && !seenColors.includes(questionColor)) || (answer === "No" && seenColors.includes(questionColor))) {
      // Incorrect answer, reset the game
      setCurrentScore(0);
      setSeenColors([]);
      console.log("Incorrect answer. Game reset.");

      generateNewQuestion();
    } else {
      // Correct answer, update scores and seen colors
      setCurrentScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
  
      setSeenColors((prevColors) => {
        const newColors = [...prevColors, questionColor];
        return newColors;
      });
  
      console.log("Correct answer. Scores updated.");
      generateNewQuestion();
    }
  };

  
    return(
    <div className="appContain">
      <div className="testback">
    <div className="infoAndScorecontain">
      <div className="infoContain">
        <h1>Color Memory Card Game</h1>
        <p>Answer the questions to test your memory.</p>       
      </div>{/*info contain*/} 

      <div className="scoreGroup">
        <div className="score">
        Score: {currentScore}
          </div>{/*score*/}
        <div className="bestScore">
        Best Score: {bestScore}
          </div>{/*best Score*/}
      </div>{/*score group*/}
      </div> {/*infoAndScorecontain*/}

    <div className="cardAndQuestionContain">
      <div className="cardContain">
      <div
            key={questionColor}
            className="card"
            style={{ backgroundColor: questionColor }}
          ></div>
      </div>{/*cardContain*/}

      <div className="questionAndBtnContain">
        <div className="question">
          Have you seen this color yet?
        </div>{/*question*/}

        <div className="btnContain">
          <button onClick={() => handleButtonClick("Yes")}>Yes</button>
          <button onClick={() => handleButtonClick("No")}>No</button>
        </div>{/*BtnContain*/}
      </div>{/*questionAndBtnContain*/}


    </div>{/*cardAndQuestionContain*/}
    </div>
    {/*app contain*/}
    </div> 
      
    )
  }


export default App
