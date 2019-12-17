import inputs from '../../10/skat/input';

const baseInput = [
    '......#.#.',
    '#..#.#....',
    '..#######.',
    '.#.#.###..',
    '.#..#.....',
    '..#....#.#',
    '#..#....#.',
    '.##.#..###',
    '##...#..#.',
    '.#....####'
];
const simpleInputs = baseInput.map(str => {
    return str.split('');
});

class Asteroid {
    public x: number;
    public y: number;
    constructor(public coord: string, private asteroidMap: AsteroidMap) {
        this.x = Number(coord.split(',')[0]);
        this.y = Number(coord.split(',')[1]);
    }
    asteroidsVisible(): number {
        return this.asteroidMap.getVisibleAsteroidCount(this);
    }
}

class AsteroidMap {
    public asteroids: Map<string, Asteroid>;
    private width: number;
    private height: number;

    constructor(private data: string[][]) {
        this.asteroids = this.buildMap();
        this.width = this.data[0].length;
        this.height = this.data.length;
    }

    private buildMap(): Map<string, Asteroid> {
        const asteroids = new Map();
        for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[y].length; x++) {
                const coord = this.data[y][x];
                if (coord === '#') {
                    asteroids.set(`${x},${y}`, new Asteroid(`${x},${y}`, this));
                }
            }
        }
        return asteroids;
    }
    private getAsteroids(): Asteroid[] {
        return Array.from(this.asteroids.values());
    }
    public getVisibleAsteroidCount(asteroid: Asteroid): number {
        const slopes = new Set();
        const asteroids = this.getAsteroids().filter(
            roid => roid.coord !== asteroid.coord
        );
        asteroids.forEach(other => {
            const rise = asteroid.y - other.y;
            const run = asteroid.x - other.x;
            const slope = rise / run;
            if (asteroid.coord === '5,8') debugger;
            slopes.add(slope);
        });
        return slopes.size;
    }
    public getBestLocation(): Asteroid {
        let mostVisible = 0;
        let bestLocation: Asteroid;
        this.getAsteroids().forEach(asteroid => {
            const visible = this.getVisibleAsteroidCount(asteroid);
            if (visible > mostVisible) {
                mostVisible = visible;
                bestLocation = asteroid;
            }
        });
        return bestLocation!;
    }
}

const asteroidMap = new AsteroidMap(simpleInputs);
// console.log(asteroidMap.getBestLocation().asteroidsVisible());
console.log(
    asteroidMap.getVisibleAsteroidCount(asteroidMap.asteroids.get('5,8')!)
);

debugger;
