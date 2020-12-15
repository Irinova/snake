import React, {useEffect, useState} from 'react';
import './App.css';

type IDirection = string;
type IStep = {
    [index: string]:any
}

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function App() {
  const [ rowLength ] = useState(11);
  const [ cells ] = useState(Array.apply(null, Array(rowLength * rowLength)).map(() => null));
  const [ snake, setSnake ] = useState([ Math.floor(cells.length / 2)]);
  const [ direction, setDirection ] = useState<IDirection>('ArrowRight');
  const [ step ] = useState<IStep>({
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowUp: -rowLength,
      ArrowDown: rowLength
  });
  const [ applePosition, setApplePosition ] = useState(randomIntFromInterval(0, cells.length - 1))

  const isSnake = (i: number):boolean => {
      return snake.includes(i);
  }

  const move = () => {
      const newSnakeCell = snake[snake.length - 1] + step[direction];
      let newSnake;
      if (newSnakeCell !== applePosition) {
          snake.shift();
      }
      else {
          setApplePosition(randomIntFromInterval(0, cells.length - 1))
      }
      newSnake = [...snake, newSnakeCell];
      setSnake(newSnake);
  }

  function getKeyValue(e: KeyboardEvent) {
      setDirection(e.code);
      move();
  }

  useEffect(() => {
      document.addEventListener('keydown', getKeyValue);
      return () => {
          document.removeEventListener('keydown', getKeyValue)
      }
  }, [])

  useEffect(() => {
      const timeout = setTimeout(() => {
          move();
      }, 100);
      return () => clearTimeout(timeout);
  }, [ snake ])

  return (
    <div className='App'>
      <div className='field' style={{ gridTemplateColumns: `repeat(${rowLength}, 1fr` }}>
        {cells.map((cell, i) => {
          return (
              <div className={`cell ${isSnake(i) ? 'snake' : ''} ${applePosition === i ? 'apple' : ''}`}> </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
