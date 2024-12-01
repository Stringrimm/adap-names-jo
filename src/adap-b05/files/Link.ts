import { Node } from "./Node";
import { Directory } from "./Directory";
import { Console, error } from "console";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Exception } from "../common/Exception";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        const result: Node = this.targetNode as Node;
        return result;
    }

    public override findNodes(bn: string): Set<Node>
    {
        IllegalArgumentException.assertCondition(bn != "");
        IllegalArgumentException.isNullOrUndefined(bn);
        console.log("Path")
        try{
           
            this.assertClassInvariants();
            let acc = super.findNodes(bn);
            if(bn === this.doGetBaseName())
            {
                acc.add(this);
            }
            this.assertClassInvariants();
            return acc;
        }
        catch(error)
        {
            throw error;
        }
    }
}