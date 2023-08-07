import { Ship } from './factory'

test('create Ship object', () => {
    const myShip = new Ship(3, 0, false)
    console.log(myShip)
    expect(myShip).toEqual({});
});