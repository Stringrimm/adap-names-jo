import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set();

    constructor(bn: string, pn: Directory) {
        IllegalArgumentException.assertIsNotNullOrUndefined(bn, "Node is null");
        IllegalArgumentException.assertIsNotNullOrUndefined(pn, "Node is null");
        super(bn, pn);
    }

    public add(cn: Node): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(cn, "Node is null");
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(cn, "Node is null");
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

}