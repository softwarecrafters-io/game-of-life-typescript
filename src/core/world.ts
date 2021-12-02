import { Cell, CellStatus } from './cell';

export class World{
	private constructor(public readonly cellMatrix:Cell[][]) {}

	static createFrom(statusMatrix: CellStatus[][]) {
		const cellMatrix = statusMatrix.map((row) => row.map((status) => Cell.create(status)));
		return new World(cellMatrix);
	}

	nextGeneration() {
		return new World(
			this.cellMatrix.map((row, rowIndex) =>
				row.map((cell, columnIndex) => cell.regenerate(this.aliveNeighbors(rowIndex, columnIndex)))
			)
		);
	}

	aliveNeighbors(row: number, column: number) {
		return (
			this.aliveColumnNeighbors(row, column) +
			this.aliveNeighborsInNextRow(row, column) +
			this.aliveNeighborsInPreviousRow(row, column)
		);
	}

	private aliveNeighborsInPreviousRow(row: number, column: number) {
		let aliveNeighbors = 0;
		const previousRow = row - 1;
		if (previousRow >= 0) {
			if (this.isAliveCellAt(previousRow, column)) {
				aliveNeighbors++;
			}
			aliveNeighbors += this.aliveColumnNeighbors(previousRow, column);
		}
		return aliveNeighbors;
	}

	private aliveNeighborsInNextRow(row: number, column: number) {
		let aliveNeighbors = 0;
		const nextRow = row + 1;
		if (nextRow < this.cellMatrix.length) {
			if (this.isAliveCellAt(nextRow, column)) {
				aliveNeighbors++;
			}
			aliveNeighbors += this.aliveColumnNeighbors(nextRow, column);
		}
		return aliveNeighbors;
	}

	private aliveColumnNeighbors(row: number, column: number) {
		let aliveNeighbors = 0;
		const previousColumn = column - 1;
		if (previousColumn >= 0 && this.isAliveCellAt(row, previousColumn)) {
			aliveNeighbors++;
		}
		const nextColumn = column + 1;
		const rowLength = this.cellMatrix[row].length;
		if (nextColumn < rowLength && this.isAliveCellAt(row, nextColumn)) {
			aliveNeighbors++;
		}
		return aliveNeighbors;
	}

	private isAliveCellAt(row: number, column: number) {
		return this.cellMatrix[row][column].isAlive();
	}
}