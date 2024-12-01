import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 1;

    constructor(other: string, delimiter?: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "Cannot create StringName: other is null");
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
        IllegalArgumentException.assertCondition(super.IndexWithinArray(i), "Setting Index out of bounce");
        let [start,end] = this.getCompInPos(i);
        return this.name.slice(start,end);
    }
    setComponent(i: number, c: string) {
       IllegalArgumentException.assertCondition(super.IndexWithinArray(i), "Setting Index out of bounce");
       IllegalArgumentException.assertIsNotNullOrUndefined(c, "Setting String is null/undefined");
        let currLength = this.getNoComponents();
        let currName = this.name;
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

        MethodFailedException.assertCondition(this.getComponent(i) === c, "setting failed");
        MethodFailedException.assertCondition(currLength == this.getNoComponents(), "Something went wrong while adding");

        if(currLength != this.getNoComponents() || currLength != this.getNoComponents())
            {
                this.length = currLength;
                this.name = currName;
            }
        this.invariantsCheck();
    }

    getCompInPos(n:number) : [number, number]
    {
        IllegalArgumentException.assertCondition(super.IndexWithinArray(n), "Setting Index out of bounce");
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
    IllegalArgumentException.assertIsNotNullOrUndefined(c, "Appending string is null/undefined");
    IllegalArgumentException.assertCondition(this.getNoComponents() >= i, "Index+1 is out of bounce (Insert to Append will fail)");
    let currLength = this.getNoComponents();
    let currName = this.name;
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
    
        this.name = this.name.slice(0,startPos).concat(c).concat(this.delimiter).concat(this.name.slice(startPos,endPos)).concat(this.name.slice(endPos))
    }
    this.length++;

    if(currLength+1 != this.getNoComponents())
    {
            this.name = currName;
            this.length = currLength;
    }
    //MethodFailedException.assertCondition(currLength+1 == this.getNoComponents(), "Append failed");
    }
    append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "Appending string is null/undefined");
        let currLength = this.getNoComponents();
        let currName = this.name;
        if(this.getNoComponents() == 0)
        {
            //Notiz: Sollte eig nicht passieren, aber falls die Liste irgendwie null sein sollte, sollte man trotzdem im Fall der Fälle appenden können
            this.name = c;
        } 
        else 
        {
            this.name = this.name.concat(this.delimiter).concat(c);
        }
        this.length++;
        if(currLength+1 != this.getNoComponents())
        {
            this.name = currName;
            this.length = currLength;
        }
        //MethodFailedException.assertCondition(currLength+1 == this.getNoComponents(), "Append failed");
        this.invariantsCheck();
    }
    remove(i: number) {
        IllegalArgumentException.assertCondition(this.IndexWithinArray(i), "Index is out of bounce");
        IllegalArgumentException.assertCondition(this.getNoComponents() > 1, "You cannot remove the last comp, set it to an empty component with the Set Function");
        let [startPos,endPos] = this.getCompInPos(i);
        let currLength = this.length;
        let currName = this.name;
        if(this.getNoComponents()-1 == i) 
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

        if(currLength-1 != this.getNoComponents() || this.length <= 0)
        {
            this.length = currLength;
            this.name = currName;
        }
        MethodFailedException.assertCondition(currLength-1 == this.getNoComponents(), "Remove failed");
        MethodFailedException.assertCondition(this.length > 0, "Removed last object!");
        this.invariantsCheck();
    }

    private invariantsCheck(): void
    {
        InvalidStateException.assertIsNotNullOrUndefined(this.name, "Name cannot be null/undefinied"); //It never can be empty
        InvalidStateException.assertIsNotNullOrUndefined(this.delimiter, "Somehow someone changed the delimited after the construtor to Null");
        InvalidStateException.assertCondition(this.delimiter.length === 1, "Somehow someone changed the delimited after the construtor? With length greater then 1? Why?");
    }
    
}