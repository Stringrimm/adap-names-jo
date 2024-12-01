import { Node } from "./Node";
import { Directory } from "./Directory";
import { error } from "console";
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

    public override findNodes(bn: string): Set<Node> {

        try{
        IllegalArgumentException.assertCondition(bn !="", "bn is empty");
        IllegalArgumentException.assertIsNotNullOrUndefined(bn, "bn is null");
        this.assertClassInvariants();

        let superAcc = super.findNodes(bn);
        let acc = new Set<Node>();

        if(this.targetNode != null)
        {
            acc = new Set<Node>([...superAcc, ...this.targetNode.findNodes(bn)])
        }
        
        return acc;
        }
        catch(exception)
        {
            throw new ServiceFailureException("FindNodes didn't work as intended", exception as Exception);
        }
    }
}