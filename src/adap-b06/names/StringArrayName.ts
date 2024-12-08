import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
//import { MethodFailureException } from "../common/MethodFailureException";
import { throws } from "assert";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        IllegalArgumentException.assert(other !=null || other != undefined, "Creation failed: Input is null/undefined");
       
        super(delimiter);
        this.components = other;
    }

    getNoComponents(): number {
      //  if(this.components.length == 0)
      //  {
      //      return 1;
      //  }
        return this.components.length;
    }

    getComponent(i: number): string {
        IllegalArgumentException.assert(i != null || i != undefined, "Index is null or Undefined");
        IllegalArgumentException.assert(super.IndexWithinArray(i), "Insert failed: Index out of bounce");
        return this.components[i];
    }
    setComponent(i: number, c: string): StringArrayName {
        IllegalArgumentException.assert(i != null || i != undefined, "Index is null or Undefined");
        IllegalArgumentException.assert(c != null || c != undefined, "String is null or Undefined");
        IllegalArgumentException.assert(super.IndexWithinArray(i), "Insert failed: Index out of bounce");
        const temp_comp = this.components;
        temp_comp[i] = c;
        this.invariantsCheck();
        return new StringArrayName(temp_comp, this.delimiter);
    }

    insert(i: number, c: string) : StringArrayName{
            IllegalArgumentException.assert(this.getNoComponents() >= i, "Index+1 is out of bounce (Insert to Append will fail)");
            IllegalArgumentException.assert(c != null || c != undefined, "Inserting string is null/undefined");
            let orginalSize = this.getNoComponents();
            let originalComp = this.components;
            let temp_comp = this.components.slice(0,i).concat(c).concat(this.components.slice(i));
            let result = new StringArrayName(temp_comp, this.delimiter)
            MethodFailedException.assert(orginalSize === this.getNoComponents(), "Concat failed at appending the object"); //First check if num comp is right
            MethodFailedException.assert(orginalSize+1 === result.getNoComponents(), "Concat failed at appending the object");
            return new StringArrayName(temp_comp, this.delimiter);
        }
    
    append(c: string): StringArrayName {
        IllegalArgumentException.assert(c != undefined || c != null, "Appending Object is null or undefined!");
        IllegalArgumentException.assert(this.components != null || this.components != undefined, "Appending component list is null/undefined");
        let orginalSize = this.getNoComponents();
        let originalComp = this.components;
        let temp_comp = this.components.concat(c);
        let result = new StringArrayName(temp_comp, this.delimiter);
        MethodFailedException.assert(orginalSize === this.getNoComponents(), "Concat failed at appending the object"); //First check if num comp is right
        MethodFailedException.assert(result.getComponent(orginalSize) === c, "Component didn't not add string to new component"); // then if component string is added
        this.invariantsCheck();
        return result;
    }
    remove(i: number): StringArrayName {
        IllegalArgumentException.assert(super.IndexWithinArray(i), "Removing Index is out of bounce");
        IllegalArgumentException.assert(this.getComponent(i) != null || this.getComponent(i) != undefined, "Removing object is null");
        let orginalSize = this.getNoComponents();
        let originComp = this.components;
        let temp_comp =this.components.slice(0,i).concat(this.components.slice(i+1));
        let result = new StringArrayName(temp_comp, this.delimiter);
        MethodFailedException.assert(this.getNoComponents() === orginalSize, "Remove failed, original has been altered");
        MethodFailedException.assert(result.getNoComponents() === orginalSize-1, "Remove failed, value obj has not been altered");
        this.invariantsCheck();
        return result;
          
    }

    private invariantsCheck(): void 
    {
        InvalidStateException.assert(this.delimiter.length === 1, "Somehow someone changed the delimited after the construtor? With length greater then 1? Why?");
        InvalidStateException.assert(this.components != null || this.components != undefined, "HOW THE LIST NULL OR UNDEFINITE. IS THIS THE MAKING OF DAVE THE MAGICAL CHEESE WIZARD???");
        InvalidStateException.assert(this.components.length >= 0, "SOMEONE REMOVED THE COMP LIST. HOW? DAVE!");
        this.components.forEach(element => InvalidStateException.assert(element != null || element !=undefined, "DAVE ADDED A NULL ELEMENT. SHAME."));
    }
}