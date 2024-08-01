import { useEffect } from 'react';
import { FaFlag, FaBomb } from 'react-icons/fa';
import { useMinesweeper } from '../../hooks/useMinesweeper';

// TODO: Add timer; Add restart button


const Game: React.FC = () => {
    const rows = 10;
    const cols = 10;
    const mines = 15;
    let { grid, isGameOver, isGameWon, initializeGrid, revealCell, toggleFlag } = useMinesweeper(rows, cols, mines);

    useEffect(() => {
        initializeGrid();
    }, []);

    const handleCellClick = (row: number, col: number) => {
        revealCell(row, col);
    };

    const handleCellRightClick = (row: number, col: number, e: React.MouseEvent) => {
        e.preventDefault();
        toggleFlag(row, col);
    };

    return (
        <div className="p-1">
            <div className='h-14'>
                {!isGameOver && !isGameWon && <p className='text-xs text-center pt-2 my-1'>======= MINESWEEPER ========</p>}
                {isGameOver && <p className='my-1 text-red-500 text-xs text-center'>Game Over!</p>}
                {isGameWon && <p className='my-1 text-green-500 text-xs text-center'>Win!</p>}
                {isGameOver || isGameWon ? (
                    <div className='w-full flex justify-center'>
                        <button className='text-xs text-center border p-2 bg-white hover:bg-black hover:text-white' onClick={() => { initializeGrid(); }}>
                            Replay ?
                        </button>
                    </div>
                ) : ('')}
            </div>
            <div className={"grid text-center mt-4 " + "grid-cols-10"}>
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`h-8 border border-gray-400 m-0 flex items-center justify-center text-xs cursor-pointer
                ${cell.isRevealed ? 'bg-gray-300' : 'bg-gray-100'}
                ${cell.isFlagged ? 'text-red-500' : ''}
                ${cell.isRevealed && cell.isMine ? 'bg-red-500' : ''}
              `}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onContextMenu={(e) => handleCellRightClick(rowIndex, colIndex, e)}
                        >
                            {cell.isFlagged && !cell.isRevealed ? <FaFlag /> : ''}
                            {cell.isRevealed && cell.isMine ? <FaBomb /> : ''}
                            {cell.isRevealed && !cell.isMine && cell.neighboringMines > 0 ? cell.neighboringMines : ''}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Game;