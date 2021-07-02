export enum CellStatus {
	Dead,
	Alive,
}

export class Cell {
	constructor(private status: CellStatus) {}

	regenerate(numberOfNeighbours: number) {
		if (this.status === CellStatus.Alive) {
			if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
				return CellStatus.Alive;
			} else {
				return CellStatus.Dead;
			}
		} else {
			if (numberOfNeighbours === 3) {
				return CellStatus.Alive;
			}
			return CellStatus.Dead;
		}
	}
}
