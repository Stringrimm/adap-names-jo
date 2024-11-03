import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if(delimiter != null)
        {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.map(s => s.replaceAll(ESCAPE_CHARACTER+delimiter, delimiter)).join(delimiter);
    }

    public asDataString(): string {
        //return this.components.map(s => s.replaceAll(DEFAULT_DELIMITER, ESCAPE_CHARACTER+this.delimiter)).join(DEFAULT_DELIMITER);
        return this.sanitizeComp();
    }

    private sanitizeComp(): string
    {
        let s = "";
        this.components.forEach(element => {
            let temp = "";
            for(let i = 0; i < element.length; i++)
            {
                let curChar = element.charAt(i);
                if(curChar == ESCAPE_CHARACTER && element.charAt(i+1)==this.delimiter)
                {            
                    temp += this.delimiter;
                    i +=1;
                }
                else if(curChar == ESCAPE_CHARACTER && element.charAt(i+1)==DEFAULT_DELIMITER)
                {
                    temp += ESCAPE_CHARACTER+DEFAULT_DELIMITER;
                    i+=1;
                }
                else if(curChar == this.delimiter)
                {
                    temp += DEFAULT_DELIMITER;
                }
                else if(curChar == DEFAULT_DELIMITER)
                {
                    temp += ESCAPE_CHARACTER+DEFAULT_DELIMITER;
                }
                else
                {
                    temp += curChar;
                }
            }
            s += temp+DEFAULT_DELIMITER;
        });
        //removes last wrong def delimiter
        return s.slice(0,s.length-1);
    }

    public isEmpty(): boolean {
        return this.components.length == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if(i >= this.components.length || i < 0)
        {
            throw new Error("Out of Bounce");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if(i >= this.components.length || i < 0)
            {
                throw new Error("Out of Bounce");
            }

        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if(i < this.components.length && i >= 0)
        {
            this.components = this.components.slice(0,i).concat(c).concat(this.components.slice(i));
        }
    }

    public append(c: string): void {
        this.components = this.components.concat(c);
    }

    public remove(i: number): void {
        if(i >= this.components.length || i < 0)
        {
            throw new Error("Out of Bounce");
        }
        this.components=this.components.slice(0,i).concat(this.components.slice(i+1));
    }

    public concat(other: Name): void {
        // Adding another String Array to another
        for(let i = 0; i < other.getNoComponents(); i++)
        {
            this.append(other.getComponent(i))
        }
    }

}