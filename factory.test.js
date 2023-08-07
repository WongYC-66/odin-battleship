import { Ship, GameBoard } from './factory'

test('create Ship object correctly', () => {
    const myShip = new Ship(3, 1, false)
    expect(myShip.sunk).toEqual(false);
    expect(myShip.length).toEqual(3);
    expect(myShip.hitCount).toEqual(1);
    expect(myShip.sunk).toEqual(false);
    myShip.hit()
    expect(myShip.hitCount).toEqual(2);
    expect(myShip.sunk).toEqual(false);
    myShip.hit()
    expect(myShip.hitCount).toEqual(3);
    expect(myShip.sunk).toEqual(true);
    // check ship to be sunk even argument is false.
    const sunkShip = new Ship(5, 5, false)
    expect(sunkShip.length).toEqual(5);
    expect(sunkShip.hitCount).toEqual(5);
    expect(sunkShip.sunk).toEqual(true);
});

test('create gameboard correctly', () => {
    const myBoard = new GameBoard()
    expect(myBoard.board).not.toBeNull();
    expect(myBoard.board.length).toEqual(10);
    expect(myBoard.board[0].length).toEqual(10);
    expect(myBoard.board[9].length).toEqual(10);
    expect(myBoard.board[0][0]).toEqual(' ');
    expect(myBoard.board[9][9]).toEqual(' ');
});

test('can place ship', () => {
    const myBoard = new GameBoard()
    myBoard.placeShip([0, 0], 'horizontal', 1)
    expect(myBoard.allShip.length).toEqual(1) 
    expect(myBoard.board[0][0]).not.toEqual(' ')
});

test('can place ship at corner if length = 1', () => {
    const myBoard = new GameBoard()
    myBoard.placeShip([0, 0], 'horizontal', 1)
    expect(myBoard.board[0][0]).not.toEqual(' ')
    myBoard.placeShip([9, 0], 'horizontal', 1)
    expect(myBoard.board[0][9]).not.toEqual(' ')
    myBoard.placeShip([0, 9], 'horizontal', 1)
    expect(myBoard.board[9][0]).not.toEqual(' ')
    myBoard.placeShip([9, 9], 'horizontal', 1)
    expect(myBoard.board[9][9]).not.toEqual(' ')
    expect(myBoard.allShip.length).toEqual(4) 
});

test('cannot place ship at corner that cross boundary', () => {
    const myBoard = new GameBoard()
    myBoard.placeShip([9, 0], 'horizontal', 3)
    expect(myBoard.allShip.length).toEqual(0) 
    expect(myBoard.board[0][9]).toEqual(' ')
    myBoard.placeShip([0, 9], 'vertical', 3)
    expect(myBoard.allShip.length).toEqual(0) 
    expect(myBoard.board[9][0]).toEqual(' ')
});

test('cannot place ship that clashes other', () => {
    const myBoard = new GameBoard()
    myBoard.placeShip([4, 4], 'vertical', 5)
    expect(myBoard.allShip.length).toEqual(1) 
    myBoard.placeShip([1, 4], 'horizontal', 5)
    expect(myBoard.allShip.length).toEqual(1) 
    myBoard.placeShip([4, 2], 'vertical', 5)
    expect(myBoard.allShip.length).toEqual(1) 
});

