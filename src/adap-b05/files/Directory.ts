import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public override findNodes(bn: string): Set<Node>
    {
        IllegalArgumentException.assertCondition(bn != "");
        IllegalArgumentException.isNullOrUndefined(bn);
        console.log(this.getBaseName());
        try{
           
            this.assertClassInvariants();
            let acc = super.findNodes(bn);
            this.childNodes.forEach( element => acc =new Set<Node>([...acc, ...element.findNodes(bn)]));
            this.assertClassInvariants();
            return acc;
        }
        catch(error)
        {
            throw error;
        }
    }

}