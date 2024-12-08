import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { assert } from "console";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 1;

    constructor(other: string, delimiter?: string) {
        IllegalArgumentException.assert(other != null || other != undefined, "Cannot create StringName: other is null");
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
        IllegalArgumentException.assert(super.IndexWithinArray(i), "Setting Index out of bounce");
        let [start,end] = this.getCompInPos(i);
        return this.name.slice(start,end);
    }
    setComponent(i: number, c: string) : StringName {
       IllegalArgumentException.assert(super.IndexWithinArray(i), "Setting Index out of bounce");
       IllegalArgumentException.assert(this.isNotNullOrUndefined(c), "Setting String is null/undefined");
        let currLength = this.getNoComponents();
        let currName = this.name;
        let [startPos,endPos] = this.getCompInPos(i);
        console.log(startPos,endPos)
        let temp_name: string;
        temp_name = this.name;
        if(i === this.getNoComponents()-1)
        {
            temp_name = this.name.slice(0,startPos).concat(c);
        } 
        else if (i < this.getNoComponents()-1) 
        {
            temp_name = this.name.slice(0,startPos).concat(c).concat(this.name.slice(endPos))
        }
        let temp_String = new StringName(temp_name, this.delimiter);
        MethodFailedException.assert(temp_String.getComponent(i) === c, "setting failed");
        MethodFailedException.assert(currLength == temp_String.getNoComponents(), "Something went wrong while adding");

        this.invariantsCheck();
        return temp_String;
    }

    getCompInPos(n:number) : [number, number]
    {
        IllegalArgumentException.assert(super.IndexWithinArray(n), "Setting Index out of bounce");
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

    insert(i: number, c: string) : StringName {
    IllegalArgumentException.assert(this.isNotNullOrUndefined(c), "Appending string is null/undefined");
    IllegalArgumentException.assert(this.getNoComponents() >= i, "Index+1 is out of bounce (Insert to Append will fail)");
    let currLength = this.getNoComponents();
    let currName = this.name;
    let result;
    if(this.name === "")
    {
        console.log(this.getNoComponents())
    }
    if(i === this.getNoComponents())
    {
        result = this.append(c);
        MethodFailedException.assert(c === result.getComponent(i), "Insert didn't add right obj, something went wrong");
        MethodFailedException.assert(currLength === this.getNoComponents(), "Insert altered original");
        MethodFailedException.assert(currLength+1 === result.getNoComponents(), "Insert didn't work");
        this.invariantsCheck();
        return result;
    }
    else 
    {
        //normal case
        let [startPos, endPos] = this.getCompInPos(i);
        let temp_name = this.name.slice(0,startPos).concat(c).concat(this.delimiter).concat(this.name.slice(startPos,endPos)).concat(this.name.slice(endPos));
        result = new StringName(temp_name, this.delimiter);
        MethodFailedException.assert(c === result.getComponent(i), "Insert didn't add right obj, something went wrong");
        MethodFailedException.assert(currLength === this.getNoComponents(), "Insert altered original");
        MethodFailedException.assert(currLength+1 === result.getNoComponents(), "Insert didn't work");
        this.invariantsCheck();
        return new StringName(temp_name, this.delimiter);
    }
    
    //MethodFailedException.assertCondition(currLength+1 == this.getNoComponents(), "Append failed");
        
    }
    append(c: string) {
        IllegalArgumentException.assert(this.isNotNullOrUndefined(c), "Appending string is null/undefined");
        let currLength = this.getNoComponents();
        let currName = this.name;
        if(this.getNoComponents() == 0)
        {
            //Notiz: Sollte eig nicht passieren, aber falls die Liste irgendwie null sein sollte, sollte man trotzdem im Fall der Fälle appenden können
            //this.name = c;
            return new StringName(c , this.delimiter)
        } 
        else 
        {
            let temp_name = this.name.concat(this.delimiter).concat(c);
            return new StringName(temp_name, this.delimiter);
        }
        this.length++;     
        //MethodFailedException.assertCondition(currLength+1 == this.getNoComponents(), "Append failed");
        this.invariantsCheck();
    }
    remove(i: number) : StringName {
        IllegalArgumentException.assert(this.IndexWithinArray(i), "Index is out of bounce");
        IllegalArgumentException.assert(this.getNoComponents() > 1, "You cannot remove the last comp, set it to an empty component with the Set Function");
        let [startPos,endPos] = this.getCompInPos(i);
        let currLength = this.length;
        let temp_name;
        if(this.getNoComponents()-1 == i) 
        {
            temp_name = this.name.slice(0,startPos-1)
            return new StringName(temp_name, this.delimiter);
        }

        else if(i==0)
        {
            return new StringName(this.name.slice(endPos+1), this.delimiter)
        } 

        else
        {
            return new StringName(this.name.slice(0,startPos-1).concat(this.name.slice(endPos)),this.delimiter);
        }
        // TODO: Implement MethodFailed 
        MethodFailedException.assert(currLength-1 == this.getNoComponents(), "Remove failed");
        MethodFailedException.assert(this.length > 0, "Removed last object!");
        this.invariantsCheck();
    }

    private invariantsCheck(): void
    {
        InvalidStateException.assert(this.isNotNullOrUndefined(this.name), "Name cannot be null/undefinied"); //It never can be empty
        InvalidStateException.assert(this.isNotNullOrUndefined(this.delimiter), "Somehow someone changed the delimited after the construtor to Null");
        InvalidStateException.assert(this.delimiter.length === 1, "Somehow someone changed the delimited after the construtor? With length greater then 1? Why?");
    }
    
}