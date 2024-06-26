
import './App.css';
import React from'react';
import { useState} from 'react';

function App() {

  const [value,setValue]= useState(6);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const[undoCount,setUndoCount] = useState(0)
  
  // const prevValueRef = useRef();

  const handleClick = (key) => {
    const operator = key.trim().charAt(0);
    const number = parseFloat(key.slice(1).trim());

    // Function to calculate new value based on operator
    const calculateNewValue = (prevValue) => {
      switch (operator) {
        case '/':
          return prevValue / number;
        case '-':
          return prevValue - number;
        case '+':
          return prevValue + number;
        case '*':
          return prevValue * number;
        default:
          return prevValue;
      }
    };

    const newValue = calculateNewValue(value);
    historybox(key,value,newValue)
    setValue(newValue);
  };

  const historybox = (key, previousValue, currValue) => {
    const operation = {
      key,
      previousValue,
      currValue,
      display: `${key} : ${previousValue}  ${currValue}`
    };
    setHistory((prevHistory) => [operation, ...prevHistory]);
  };

      const handleUndo = () =>{
        if (history.length > 0){
          if (undoCount + 1 > 50){
            alert("You cannot Undo beyond the limit = 50")
            return;
          }
          const copyHistory = [...history];
          const firstItem = copyHistory.shift();
          setHistory(copyHistory)

          setValue(firstItem.previousValue)
          const copyRedoList = [...redoList]
          copyRedoList.push(firstItem);
          setRedoList(copyRedoList);
          setUndoCount(undoCount + 1);
        }
    };

    const handleRedo = () =>{
      if (redoList.length){
        const copyRedoList = [...redoList];
        const undoItem = copyRedoList.pop();
        setRedoList(copyRedoList);
        setValue(undoItem.currValue);
        historybox(undoItem.key, undoItem.previousValue, undoItem.currValue);
      }
      };

    const handleReset = () => {
      setValue(6);
      setHistory([]);
      setRedoList([]);
      setUndoCount(0);
    };
  // useEffect(() => {
  //   console.log('Updated value:', value);
  // }, [value]);

  return (
    <div className="App">
      <h1 style={{textDecoration: "underline"}}> [UNDOABLE COUNTER]</h1>
      <div className='function-btn'>
        <button  onClick={() => handleUndo()} className="undo">Undo</button>
        <button onClick = {() => handleRedo()} className="redo">Redo</button>
        <button onClick = {() => handleReset()} className="reset">Reset</button>
      </div>
      <div className="operation-btn" >  
            { 
              ["/2","-1 "].map((btn) =>{
                return (<button onClick={() => handleClick(btn)} className='action-btn'>{btn}</button>)
              })
            }
              <div style={{color: "dark grey", fontSize: "xxx-large",margin:"10px",fontFamily: "cursive"}}> {value} </div>
            { 
              [ "* 2","+1" ].map((btn) =>{
                return (<button  onClick={() => handleClick(btn)}  className='action-btn'>{btn}</button>)
              })
            }
      </div>
      <h2 style = {{color: "darkblue",fontSize:"xxx-larger",fontFamily: "cursive"}}>History Box</h2>
      <div className = "history-box">
        <ul>
        {history.map((operation, index) => (
            <li key={index}>{operation.display}</li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default App;
