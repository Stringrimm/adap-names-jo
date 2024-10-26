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
// Conversion
    public asNameString(delimiter: string = this.delimiter): string {
        let temp = "";
        
        if(this.components.length == 0)
        {
            return temp;
        }
        
        for(let i = 0; i < this.components.length; i++)
        {
            if(i != this.components.length-1)
            {
            temp = temp + this.components[i] + delimiter;
            }else{
                temp = temp + this.components[i];
            }
        }

        return temp;
    }
    //Query
    public getComponent(i: number): string {
        if(i>=0 && i < this.components.length){
            return this.components[i];
        }
        else
        {
            throw new Error("Index out of Array");
        }
    }
    //Mutation
    public setComponent(i: number, c: string): void {
        if(this.components.length < i)
            {
                this.components[i] = c;
                
            } 

    }
//Query
    public getNoComponents(): number {
        return this.components.length;
    }
// Command
    public insert(i: number, c: string): void {
        let temp = [];
        if(i < this.components.length && i >= 0)
        {
            temp = this.components.slice(0,i).concat(c).concat(this.components.slice(i));
            this.components=temp;
        }
    }
// Command
    public append(c: string): void {
        this.components = this.components.concat(c);
    }
// Command
    public remove(i: number): void {
        if(i >= 0){
        this.components=this.components.slice(0,i).concat(this.components.slice(i+1));
        }
    }
}

