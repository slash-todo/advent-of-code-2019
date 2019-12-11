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
    com: Body;
    systemGenerated: boolean;

    constructor(orbitalMap: string[]) {
        this.systemGenerated = false;
        this.bodies = new Map();
        this.generateSystemMap(orbitalMap);
        this.com = this.getBody('COM');
    }

    generateSystemMap(map: string[]): void {
        map.forEach((entry: string) => this.processMapEntry(entry));
        this.systemGenerated = true;
    }

    processMapEntry(entry: string): void {
        const self: string = entry.split(')')[0];
        const child: string = entry.split(')')[1];
        const selfBody: Body | undefined = this.bodies.get(self);
        const childBody: Body | undefined = this.bodies.get(child);

        const _placeSelf = () => {
            if (selfBody) {
                // body already exists
                selfBody.children.push(child);
                this.bodies.set(self, selfBody);
            } else {
                // body is new
                this.bodies.set(self, new Body(this, self, [child]));
            }
        };

        const _placeChild = () => {
            if (!childBody) {
                this.bodies.set(child, new Body(this, child));
            }
        };

        _placeSelf();
        _placeChild();
    }
    findParent(name: string): Body {
        const target = Array.from(this.bodies.values()).find(body =>
            body.children.includes(name)
        );

        if (!target) {
            throw new Error(`Body name: '${name}' Not Found`);
        }

        return target;
    }
    getBody(name: string): Body {
        const target = this.bodies.get(name);
        if (!target) {
            throw new Error(`Body name: '${name}' Not Found`);
        }
        return target;
    }
    getLineage(name: string): Body[] {
        const starter: Body = this.getBody(name);
        const lineage: Body[] = [];
        let current: Body = starter;

        if (!this.systemGenerated) {
            throw new Error('System Not Generated');
        }

        while (current !== this.com && this.systemGenerated) {
            lineage.unshift(current!);
            current = current.parent();
        }
        lineage.unshift(this.getBody('COM')!);

        return lineage;
    }
    countOrbits(): number {
        const names = Array.from(this.bodies.keys());
        return names.reduce((acc: number, cur: string): number => {
            return (acc += this.getLineage(cur).length - 1);
        }, 0);
    }
}

class Body {
    system: System;
    name: string;
    children: string[];
    constructor(system: System, name: string, children: string[] = []) {
        this.system = system;
        this.name = name;
        this.children = children;
    }
    parent(): Body {
        return this.system.findParent(this.name);
    }
}

const system = new System(inputs);
console.log(system.countOrbits());
debugger;
