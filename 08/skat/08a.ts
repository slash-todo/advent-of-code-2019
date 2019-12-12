import inputs from '../../08/skat/input';

class Image {
    layers: number[][];
    public constructor(
        private data: number[],
        private width: number,
        private height: number
    ) {
        this.layers = [];
        this.processDataIntoLayers();
        this.getLayerWithFewestZeros();
    }
    private processDataIntoLayers(): void {
        let data = [...this.data];
        const layerLength = this.width * this.height;

        while (data.length) {
            this.layers.push(data.splice(0, layerLength));
        }
    }
    private getLayerWithFewestZeros(): number[] {
        return this.layers.reduce((acc, cur) => {
            return acc.filter(el => el !== 0).length >
                cur.filter(el => el !== 0).length
                ? acc
                : cur;
        });
    }
    public getChecksum(): number {
        const target = this.getLayerWithFewestZeros();
        const ones = target.filter(el => el === 1).length;
        const twos = target.filter(el => el === 2).length;
        return ones * twos;
    }
}

console.log(new Image(inputs, 25, 6).getChecksum());
debugger;
