export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if(delimiter != null)
        {
            this.delimiter = delimiter;
        }
    }
/** @methodtype conversion-method */
    public asNameString(delimiter: string = this.delimiter): string {  
            let re = this.ESCAPE_CHARACTER+delimiter;
            return this.components.map((c)=>c.replace(delimiter, re)).join(delimiter)
    }
/**@methodtype get-method*/
    public getComponent(i: number): string {
        if(i>=0 && i < this.components.length){
            return this.components[i];
        }
        else
        {
            throw new Error("Index out of Array");
        }
    }
    /**@methodtype set-method*/
    public setComponent(i: number, c: string): void {
        if(this.components.length < i)
        {
            this.components[i] = c;           
        } 

    }
/** @methodtype get-method*/
    public getNoComponents(): number 
    {
        return this.components.length;
    }
/** @methodtype command-method */
    public insert(i: number, c: string): void {
        if(i < this.components.length && i >= 0)
        {
            this.components = this.components.slice(0,i).concat(c).concat(this.components.slice(i));
        }
    }
/** @methodtype command-method */
    public append(c: string): void {
        this.components = this.components.concat(c);
    }
/** @methodtype command-method */
    public remove(i: number): void {
        if(i >= 0 && i < this.components.length){
        this.components=this.components.slice(0,i).concat(this.components.slice(i+1));
        }
    }
}

