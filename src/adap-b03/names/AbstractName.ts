import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if(delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let acc: string[] = [];
        console.log(this)
        for(let i = 0; i < this.getNoComponents(); i++)
        {
            let comp = this.getComponent(i).replaceAll(ESCAPE_CHARACTER, '');
            acc.push(comp);   
        }
        console.log(acc);
        return acc.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let acc: string[] = [];
        for(let i = 0; i < this.getNoComponents(); i++)
        {
            acc.push(this.getComponent(i).replaceAll(DEFAULT_DELIMITER, ESCAPE_CHARACTER+DEFAULT_DELIMITER).replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter));
        }
        return acc.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        return this.asDataString() === other.asDataString()
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        return {... this}; //adapted from Coordinates
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        if(other.getDelimiterCharacter() == this.delimiter)
        {
            for(let i=0; i < other.getNoComponents(); i++)
            {
                console.log(other.getComponent(i));
                let comp = other.getComponent(i);
                this.append(comp);
            }
        }
    }

}