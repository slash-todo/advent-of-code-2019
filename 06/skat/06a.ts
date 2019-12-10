// unsolved

// import inputs from './input';
import inputs from '../../06/skat/input';

const simpleInputs = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L'
];

class System {
    bodies: Map<string, Body>;
    com: Body | undefined;

    constructor(orbitalMap: string[]) {
        this.bodies = new Map();
        this.generateSystemMap(orbitalMap);
        this.com = this.bodies.get('COM');
    }

    generateSystemMap(map: string[]): void {
        map.forEach((entry: string) => this.processMapEntry(entry));
    }

    processMapEntry(entry: string): void {
        const self = entry.split(')')[0];
        const child = entry.split(')')[1];
        const body: Body | undefined = this.bodies.get(self);

        if (body) {
            body.children.push(child);
            this.bodies.set(self, body);
        } else {
            this.bodies.set(self, new Body(this, self, null, [child]));
        }
    }
    findParent(name: string): Body | undefined {
        return Array.from(this.bodies.values()).find(body =>
            body.children.includes(name)
        );
    }
}

class Body {
    system: System;
    name: string;
    children: string[];
    constructor(
        system: System,
        name: string,
        parent: string | null = null,
        children: string[] = []
    ) {
        this.system = system;
        this.name = name;
        this.children = children;
    }
    parent(): Body | undefined {
        return this.system.findParent(this.name);
    }
}

console.log(new System(inputs));

debugger;
