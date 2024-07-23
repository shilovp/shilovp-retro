import { useState } from 'react';

export type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighboringMines: number;
};

export const useMinesweeper = (rows: number, cols: number, mines: number) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const initializeGrid = () => {
    let grid: Cell[][] = Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighboringMines: 0,
      }))
    );

    // Place mines
    let placedMines = 0;
    while (placedMines < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!grid[row][col].isMine) {
        grid[row][col].isMine = true;
        placedMines++;
      }
    }

    // Calculate neighboring mines
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col].isMine) continue;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol].isMine) {
            grid[row][col].neighboringMines++;
          }
        });
      }
    }

    setGrid(grid);
  };

  const revealCell = (row: number, col: number) => {
    if (isGameOver || grid[row][col].isRevealed || grid[row][col].isFlagged) return;
    const newGrid = grid.slice();
    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].isMine) {
      setIsGameOver(true);
      // Reveal all mines
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
    } else if (newGrid[row][col].neighboringMines === 0) {
      // Reveal neighboring cells if there are no neighboring mines
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          revealCell(newRow, newCol);
        }
      });
    }

    checkWinCondition();

    setGrid(newGrid);
  };

  const toggleFlag = (row: number, col: number) => {
    if (isGameOver || grid[row][col].isRevealed) return;
    const newGrid = grid.slice();
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
  };

  const checkWinCondition = () => {
    // Check if all non-mine cells are revealed
    if (grid.every(row => row.every(cell => (cell.isMine || cell.isRevealed)))) {
      setIsGameWon(true);
    }
  };

  return {
    grid,
    isGameOver,
    isGameWon,
    initializeGrid,
    revealCell,
    toggleFlag,
    checkWinCondition,
  };
};