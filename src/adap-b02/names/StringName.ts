import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        if(delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
        this.length = this.getNoComponents();
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.replaceAll(`${ESCAPE_CHARACTER}${delimiter}`,delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public isEmpty(): boolean {
        return this.name === "";
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        let stinglen = this.name.length;
        let i = 0;
        let count = 1;
        while(i < stinglen)
        {
            let curChar = this.name.charAt(i)
            if(curChar === ESCAPE_CHARACTER)
            {
                if(this.name.charAt(i+1) === this.delimiter)
                {
                    i += 2;
                    continue;
                }
            } 
            if (curChar === this.delimiter)
            {
                count++;
            }
            i++;
        }
        return count;
    }

    public getComponent(x: number): string {
        let stinglen = this.name.length;
        let i = 0;
        let count = 0;
        let record = "";
        while(i < stinglen)
        {
            let curChar = this.name.charAt(i)
            if(count === x)
            {
                if(curChar != this.delimiter)
                {
                record += curChar;
                }else
                {
                    return record;
                }
            }
            if(curChar === ESCAPE_CHARACTER)
            {
                let nextChar = this.name.charAt(i+1);
                if(nextChar === this.delimiter)
                {
                    record += nextChar;
                    i += 2;
                    continue;
                }
            }
            if(curChar === this.delimiter)
            {
                count++;
            }
            i++;
        }
        return record;
    }

    public setComponent(n: number, c: string): void {
        if(n >= this.getNoComponents())
        {
            throw new Error("?????????????????");
        }


        let [startPos,endPos] = this.getCompInPos(n)
        console.log(startPos,endPos)

        if(n === this.getNoComponents()-1)
        {
            this.name = this.name.slice(0,startPos).concat(c);
        } 
        else if (n < this.getNoComponents()-1) 
        {
            this.name = this.name.slice(0,startPos).concat(c).concat(this.name.slice(endPos))
        }
    }

    private getCompInPos(n:number) : [number, number]
    {
        let count = 0;
        let i = 0;
        let startPos = 0;
        let endPos;

        while (i < this.name.length)
        {
            let curChar = this.name.charAt(i);
            if(curChar === ESCAPE_CHARACTER)
            {
                if(this.name.charAt(i+1) === this.delimiter)
                {
                    i +=2;
                    continue;
                }
            }

            if(curChar === this.delimiter)
            {
                count++;
                if(count === n)
                {
                    startPos = i+1;
                }

                if(count === n+1)
                {
                    endPos = i;
                    return [startPos,endPos];
                }
            }
            i++;
        }
        if(endPos === undefined)
        {
            endPos = this.name.length
        }
        return [startPos,endPos];
    }

    public insert(n: number, c: string): void {
        if(this.name === "")
        {
            console.log(this.getNoComponents())
        }
       if(n === this.getNoComponents())
        {
           this.append(c);
        }
        else 
        {
            //normal case
            let [startPos, endPos] = this.getCompInPos(n);
           
            console.log(startPos,endPos)
            this.name = this.name.slice(0,startPos).concat(c).concat(this.delimiter).concat(this.name.slice(startPos,endPos)).concat(this.name.slice(endPos))
        }
        this.length++;
    }

    public append(c: string): void {
        if(this.getNoComponents() == 0)
        {
            this.name = c;
        } 
        else if (this.getComponent(0)==="")
        {
            this.name = this.delimiter+c;
        }
        else 
        {
            this.name = this.name.concat(this.delimiter).concat(c);
        }
        this.length++;
    }

    public remove(n: number): void {
        let [startPos,endPos] = this.getCompInPos(n);
        if(this.getNoComponents() == 1)
        {
            this.name = ''
        } 
        
        else if(this.getNoComponents() == n) 
        {
            this.name = this.name.slice(0,startPos-1)
            this.length--;
        }

        else if(n==0)
        {
            this.name = this.name.slice(endPos+1)
            this.length--;
        } 

        else
        {
            this.name = this.name.slice(0,startPos-1).concat(this.name.slice(endPos))
            this.length--;
        }

    }

    public concat(other: Name): void {
        this.name.concat(this.delimiter).concat(other.asDataString());
        this.length = this.getNoComponents();
    }

}