import React, { useEffect, useState } from 'react';
import './App.css';

type IDirection = string;
type IStep = {
    [index: string]:any
}

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function App() {
  const [ rowLength ] = useState(21);
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

  const detectPosition = () => {
      let newPosition = snake[snake.length - 1] + step[direction];
      console.log('newPosition', newPosition)
      if (newPosition < 0) {
          newPosition = cells.length - rowLength + (rowLength + newPosition);
      }
      if (newPosition > cells.length) {
          newPosition = rowLength - (cells.length - newPosition + rowLength);
          console.log('>',newPosition)
      }
      if (direction === 'ArrowRight' && (newPosition % rowLength) === 0) {
          newPosition = newPosition - rowLength;
      }
      if (direction === 'ArrowLeft' && ((newPosition + 1) % rowLength) === 0) {
          newPosition = newPosition + rowLength;
      }
      return newPosition;
  }

  const move = () => {
      const newSnakeCell = detectPosition();
      if (newSnakeCell !== applePosition) {
          snake.shift();
      }
      else {
          setApplePosition(randomIntFromInterval(0, cells.length - 1))
      }
      const newSnake = [...snake, newSnakeCell];
      setSnake(newSnake);
  }

  function getKeyValue(e: KeyboardEvent) {
      setDirection(e.code);
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
