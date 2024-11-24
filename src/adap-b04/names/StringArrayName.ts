import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";
import { throws } from "assert";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "Creation failed: Input is null/undefined");
       
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
        IllegalArgumentException.assertIsNotNullOrUndefined(i, "Index is null or Undefined");
        IllegalArgumentException.assertCondition(super.IndexWithinArray(i), "Insert failed: Index out of bounce");
        return this.components[i];
    }
    setComponent(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, "Index is null or Undefined");
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "String is null or Undefined");
        IllegalArgumentException.assertCondition(super.IndexWithinArray(i), "Insert failed: Index out of bounce");
        this.components[i] = c;
    }

    insert(i: number, c: string) {
            IllegalArgumentException.assertCondition(this.getNoComponents() >= i, "Index+1 is out of bounce (Insert to Append will fail)");
            IllegalArgumentException.assertIsNotNullOrUndefined(c, "Inserting string is null/undefined");
            let orginalSize = this.getNoComponents();
            let originalComp = this.components;
            this.components = this.components.slice(0,i).concat(c).concat(this.components.slice(i));
            if(this.getNoComponents() === orginalSize)
            {
                this.components = originalComp;
            }
            MethodFailureException.assertCondition(orginalSize+1 === this.getNoComponents(), "Concat failed at appending the object"); //First check if num comp is right
        }
    
    append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "Appending Object is null or undefined!");
        IllegalArgumentException.assertIsNotNullOrUndefined(this.components, "Appending component list is null/undefined");
        let orginalSize = this.getNoComponents();
        let originalComp = this.components;
        this.components = this.components.concat(c);

        if(orginalSize+1 != this.getNoComponents() || this.getComponent(orginalSize) != c)
        {
            this.components = originalComp;
        }

        if(this.getNoComponents() < orginalSize+1 || this.getComponent(orginalSize) != c )
        {
            this.components = originalComp;
        }
        MethodFailureException.assertCondition(orginalSize+1 === this.getNoComponents(), "Concat failed at appending the object"); //First check if num comp is right
        MethodFailureException.assertCondition(this.getComponent(orginalSize) === c, "Component didn't not add string to new component"); // then if component string is added
     
      
        this.invariantsCheck();
    }
    remove(i: number) {
        IllegalArgumentException.assertCondition(super.IndexWithinArray(i), "Removing Index is out of bounce");
        IllegalArgumentException.assertIsNotNullOrUndefined(this.getComponent(i), "Removing object is null");
        let orginalSize = this.getNoComponents();
        let originComp = this.components;
        this.components=this.components.slice(0,i).concat(this.components.slice(i+1));
        if(this.getNoComponents() === orginalSize)
        {
            this.components = originComp;
        }
        MethodFailureException.assertCondition(this.getNoComponents() === orginalSize-1, "Remove failed, length has not been updated");
        this.invariantsCheck();
    }

    private invariantsCheck(): void 
    {
        InvalidStateException.assertCondition(this.delimiter.length === 1, "Somehow someone changed the delimited after the construtor? With length greater then 1? Why?");
        InvalidStateException.assertIsNotNullOrUndefined(this.components, "HOW THE LIST NULL OR UNDEFINITE. IS THIS THE MAKING OF DAVE THE MAGICAL CHEESE WIZARD???");
        InvalidStateException.assertCondition(this.components.length >= 0, "SOMEONE REMOVED THE COMP LIST. HOW? DAVE!");
        this.components.forEach(element => InvalidStateException.assertIsNotNullOrUndefined(element, "DAVE ADDED A NULL ELEMENT. SHAME."));
    }
}