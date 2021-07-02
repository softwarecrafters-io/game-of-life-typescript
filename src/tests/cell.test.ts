/*
any live cell with fewer than two live neighbours dies, as if by underpopulation
any live cell with two or three live neighbours lives on to the next generation
any live cell with more than three live neighbours dies, as if by overpopulation
any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
*/
enum CellStatus {
	Dead,
	Alive,
}

class Cell {
	constructor(private status: CellStatus) {}

	regenerate(numberOfNeighbours: number) {
		if (this.status === CellStatus.Alive) {
			if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
				return CellStatus.Alive;
			} else {
				return CellStatus.Dead;
			}
		} else {
			return CellStatus.Dead;
		}
	}
}

describe('In the game of life', () => {
	it('any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
		expect(new Cell(CellStatus.Alive).regenerate(1)).toBe(CellStatus.Dead);
		expect(new Cell(CellStatus.Dead).regenerate(1)).toBe(CellStatus.Dead);
	});
	it('any live cell with two or three live neighbours lives on to the next generation', () => {
		expect(new Cell(CellStatus.Alive).regenerate(2)).toBe(CellStatus.Alive);
		expect(new Cell(CellStatus.Alive).regenerate(3)).toBe(CellStatus.Alive);
		expect(new Cell(CellStatus.Dead).regenerate(2)).toBe(CellStatus.Dead);
	});
	it('any live cell with more than three live neighbours dies, as if by overpopulation', () => {
		expect(new Cell(CellStatus.Alive).regenerate(4)).toBe(CellStatus.Dead);
		expect(new Cell(CellStatus.Dead).regenerate(4)).toBe(CellStatus.Dead);
	});
});
