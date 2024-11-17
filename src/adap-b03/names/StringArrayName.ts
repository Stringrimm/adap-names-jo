import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    getNoComponents(): number {
        if(this.components.length == 0)
        {
            return 1;
        }
        return this.components.length;
    }

    getComponent(i: number): string {
        if(i > this.components.length || i < 0)
            {
                throw new Error("Out of Bounce");
            }
            return this.components[i];
    }
    setComponent(i: number, c: string) {
        if(i > this.components.length || i < 0)
            {
                throw new Error("Out of Bounce");
            }

        this.components[i] = c;
    }

    insert(i: number, c: string) {
        if(i < this.components.length && i >= 0)
        {
            this.components = this.components.slice(0,i).concat(c).concat(this.components.slice(i));
        }
    }
    append(c: string) {
        this.components = this.components.concat(c);
    }
    remove(i: number) {
        if(i >= this.components.length || i < 0)
            {
                throw new Error("Out of Bounce");
            }
        this.components=this.components.slice(0,i).concat(this.components.slice(i+1));
    }
}