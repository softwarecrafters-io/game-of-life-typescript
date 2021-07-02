export enum CellStatus {
	Dead,
	Alive,
}

export class Cell {
	constructor(private status: CellStatus) {
		if (status == null) {
			throw new Error('Invalid status');
		}
	}

	regenerate(numberOfNeighbours: number) {
		return new Cell(
			this.status === CellStatus.Alive
				? this.statusForAliveCell(numberOfNeighbours)
				: this.statusForDeadCell(numberOfNeighbours)
		);
	}

	private statusForDeadCell(numberOfNeighbours: number) {
		const isFertilePopulation = numberOfNeighbours === 3;
		return isFertilePopulation ? CellStatus.Alive : CellStatus.Dead;
	}

	private statusForAliveCell(numberOfNeighbours: number) {
		const isStablePopulation = numberOfNeighbours === 2 || numberOfNeighbours === 3;
		return isStablePopulation ? CellStatus.Alive : CellStatus.Dead;
	}

	isAlive() {
		return this.status === CellStatus.Alive;
	}
}
