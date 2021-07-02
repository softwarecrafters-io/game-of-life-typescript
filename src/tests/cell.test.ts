import { Cell, CellStatus } from '../core/cell';

describe('In the game of life', () => {
	it('any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
		expect(new Cell(CellStatus.Alive).regenerate(1).isAlive()).toBeFalsy();
		expect(new Cell(CellStatus.Dead).regenerate(1).isAlive()).toBeFalsy();
	});
	it('any live cell with two or three live neighbours lives on to the next generation', () => {
		expect(new Cell(CellStatus.Alive).regenerate(2).isAlive()).toBeTruthy();
		expect(new Cell(CellStatus.Alive).regenerate(3).isAlive()).toBeTruthy();
		expect(new Cell(CellStatus.Dead).regenerate(2).isAlive()).toBeFalsy();
	});
	it('any live cell with more than three live neighbours dies, as if by overpopulation', () => {
		expect(new Cell(CellStatus.Alive).regenerate(4).isAlive()).toBeFalsy();
		expect(new Cell(CellStatus.Dead).regenerate(4).isAlive()).toBeFalsy();
	});
	it('any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction', () => {
		expect(new Cell(CellStatus.Dead).regenerate(3).isAlive()).toBeTruthy();
	});
	it('cells with undefined initial state are not allowed', () => {
		expect(() => new Cell(undefined).regenerate(2)).toThrow();
	});
});
