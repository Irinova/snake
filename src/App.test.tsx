import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';

test('build right size of field', () => {
  const fieldLength = 20;
  render(<App fieldLength={fieldLength} staticApplePosition={false}/>);
  const cells = document.querySelectorAll('.cell');
  expect(cells).toHaveLength(fieldLength * fieldLength);
});

test('eat apple and increase snake size', async () => {
  const fieldLength = 21;
  render(<App fieldLength={fieldLength} staticApplePosition={221}/>);

  await waitFor(() => {
    const snake = document.querySelectorAll('.snake');
    expect(snake).toHaveLength(2);
  })
});


