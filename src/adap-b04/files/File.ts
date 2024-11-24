import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        IllegalArgumentException.assertIsNotNullOrUndefined(baseName, "Name is null");
        IllegalArgumentException.assertIsNotNullOrUndefined(parent, "parent is null");
        super(baseName, parent);
    }

    public open(): void {
        // do something
    }

    public close(): void {
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}