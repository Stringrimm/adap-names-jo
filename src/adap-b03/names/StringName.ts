import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = this.getNoComponents();
    }

    getNoComponents(): number {
        if(this.name=="")
        {
            return 1;
        }
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

    getComponent(i: number): string {
        let [start,end] = this.getCompInPos(i);
        return this.name.slice(start,end);
    }
    setComponent(i: number, c: string) {
        if(i >= this.getNoComponents())
        {
            throw new Error("?????????????????");
        }
    
        let [startPos,endPos] = this.getCompInPos(i);
        console.log(startPos,endPos)

        if(i === this.getNoComponents()-1)
        {
            this.name = this.name.slice(0,startPos).concat(c);
        } 
        else if (i < this.getNoComponents()-1) 
        {
            this.name = this.name.slice(0,startPos).concat(c).concat(this.name.slice(endPos))
        }
    }

    getCompInPos(n:number) : [number, number]
    {
        let count = 0;
        let i = 0;
        let startPos = 0;
        let endPos;
;
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

    insert(i: number, c: string) {
    if(this.name === "")
        {
            console.log(this.getNoComponents())
        }
        if(i === this.getNoComponents())
        {
            this.append(c);
        }
        else 
        {
            //normal case
            let [startPos, endPos] = this.getCompInPos(i);
            
            console.log(startPos,endPos)
            this.name = this.name.slice(0,startPos).concat(c).concat(this.delimiter).concat(this.name.slice(startPos,endPos)).concat(this.name.slice(endPos))
        }
        this.length++;
    }
    append(c: string) {
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
    remove(i: number) {
        let [startPos,endPos] = this.getCompInPos(i);
        if(this.getNoComponents() == 1)
        {
            this.name = ''
        } 
        
        else if(this.getNoComponents() == i) 
        {
            this.name = this.name.slice(0,startPos-1)
            this.length--;
        }

        else if(i==0)
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
}