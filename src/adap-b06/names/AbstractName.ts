import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(this.isNotNullOrUndefined(delimiter), "Delimiter is null/undefined");
        IllegalArgumentException.assert(delimiter.length == 1, "Delimiter is longer or shorter than 1");
       
            this.delimiter = delimiter;
        
    }

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(this.isNotNullOrUndefined(delimiter), "Delimiter is null/undefined");
        IllegalArgumentException.assert(delimiter.length == 1, "Delimiter is longer or shorter than 1");
        let acc: string[] = [];
        for(let i = 0; i < this.getNoComponents(); i++)
        {
            let comp = this.getComponent(i).replaceAll(ESCAPE_CHARACTER, '');
            acc.push(comp);   
        }
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
        IllegalArgumentException.assert(this.isNotNullOrUndefined(other), "Equality cannot be resolved: other is null/undefined");
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
        let obj = Object.create(Object.getPrototypeOf(this));
        return Object.assign(obj, this);
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {
        IllegalArgumentException.assert(this.isNotNullOrUndefined(other), "Cannot concat null/undefined");
        IllegalArgumentException.assert(this.delimiter === other.getDelimiterCharacter(), "Delimited don't match up");
        let currLength = this.getNoComponents();
        let temp = this.clone();
        for(let i=0; i < other.getNoComponents(); i++)
        {
            console.log("Comp:"+other.getComponent(i));
            let comp = other.getComponent(i);
            temp = temp.append(comp);
        }
        MethodFailedException.assert(currLength === this.getNoComponents(), "Concat went wrong");
        return temp;
    }

    public IndexWithinArray(num: number) : boolean
    {
        IllegalArgumentException.assert(this.isNotNullOrUndefined(num), "num is null/undefined");
        return (num < this.getNoComponents() && num >= 0);
    }

    protected isNotNullOrUndefined(ob: Object | null): boolean
    {
        return !((ob == undefined) || (ob == null));
    }
}

