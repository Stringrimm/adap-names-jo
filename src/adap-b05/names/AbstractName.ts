import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter, "Delimiter is null/undefined");
        IllegalArgumentException.assertCondition(delimiter.length == 1, "Delimiter is longer or shorter than 1");
       
            this.delimiter = delimiter;
        
    }

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter, "Delimiter is null/undefined");
        IllegalArgumentException.assertCondition(delimiter.length == 1, "Delimiter is longer or shorter than 1");
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
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "Equality cannot be resolved: other is null/undefined");
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
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "Cannot concat null/undefined");
        IllegalArgumentException.assertCondition(this.delimiter === other.getDelimiterCharacter(), "Delimited don't match up");
        let currLength = this.getNoComponents();
        for(let i=0; i < other.getNoComponents(); i++)
        {
            console.log(other.getComponent(i));
            let comp = other.getComponent(i);
            this.append(comp);
        }

        MethodFailedException.assertCondition(currLength+other.getNoComponents() === this.getNoComponents(), "Concat went wrong");
        
    }

    public IndexWithinArray(num: number) : boolean
    {
        IllegalArgumentException.assertIsNotNullOrUndefined(num, "num is null/undefined");
        return (num < this.getNoComponents() && num >= 0);
    }

}