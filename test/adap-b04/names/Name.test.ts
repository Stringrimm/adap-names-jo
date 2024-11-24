import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";


import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailureException } from "../../../src/adap-b04/common/MethodFailureException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { N } from "vitest/dist/chunks/reporters.WnPwkmgA";


describe("Null checks")
{
        it("Constructor", () => {
          expect(() => new StringName(null as any, ',')).toThrow(new IllegalArgumentException("Cannot create StringName: other is null"));
          expect(() => new StringName("", null as any)).toThrow(new IllegalArgumentException("Delimiter is null/undefined"));
          expect(() => new StringName("Among,us", 'asdasdsa')).toThrow(new IllegalArgumentException("Delimiter is longer or shorter than 1"));
          
          expect(() => new StringArrayName(null as any, ',')).toThrow(new IllegalArgumentException("Creation failed: Input is null/undefined"));
          expect(() => new StringArrayName(["asd"], null as any)).toThrow(new IllegalArgumentException("Delimiter is null/undefined"));
          expect(() => new StringArrayName(["asdasd"], 'asdasdsa')).toThrow(new IllegalArgumentException("Delimiter is longer or shorter than 1"));
        });

        it("Insert", () => {
            let name = new StringName("fau.cs");
            let name2 = new StringArrayName(["fau","cs"]);

            name.insert(0,"google")
            expect(name.asString()).toBe("google.fau.cs");
            name.insert(3,"google")
            expect(name.asString()).toBe("google.fau.cs.google");
            expect(() => name.insert(12, "test")).toThrow(new IllegalArgumentException("Index+1 is out of bounce (Insert to Append will fail)"));
            expect(() => name.insert(0, null as any)).toThrow(new IllegalArgumentException("Appending string is null/undefined"));

            name2.insert(0,"google")
            expect(name2.asString()).toBe("google.fau.cs");
            name2.insert(3,"google")
            expect(name2.asString()).toBe("google.fau.cs.google");
            expect(() => name2.insert(12, "test")).toThrow(new IllegalArgumentException("Index+1 is out of bounce (Insert to Append will fail)"));
            expect(() => name2.insert(0, null as any)).toThrow(new IllegalArgumentException("Inserting string is null/undefined"));
        })

        it("Set", () => {
            let name = new StringName("fau.cs");
            let name2 = new StringArrayName(["fau","cs"]);

            name.setComponent(0,"google")
            expect(name.asString()).toBe("google.cs");
            expect(() => name.setComponent(12, "test")).toThrow(new IllegalArgumentException("Setting Index out of bounce"));
            expect(() => name.setComponent(-1, "test")).toThrow(new IllegalArgumentException("Setting Index out of bounce"));
            expect(() => name.setComponent(0, null as any)).toThrow(new IllegalArgumentException("Setting String is null/undefined"));

            name2.setComponent(0,"google")
            expect(name2.asString()).toBe("google.cs");
            expect(() => name2.setComponent(12, "test")).toThrow(new IllegalArgumentException("Insert failed: Index out of bounce"));
            expect(() => name2.setComponent(0, null as any)).toThrow(new IllegalArgumentException("String is null or Undefined"));
        })

        it("Append", () => {
            let name = new StringName("fau.cs");
            let name2 = new StringArrayName(["fau","cs"]);
            let name3 = new StringName("");
            name.append("de");

            expect(name.asString()).toBe("fau.cs.de");
            expect(() => name.append(null as any)).toThrow(new IllegalArgumentException("Appending string is null/undefined"));

            name3.append("de");
            expect(name3.asString()).toBe(".de");

            name2.append("de");  
            expect(name2.asString()).toBe("fau.cs.de");

            expect(() => name2.append(null as any)).toThrow(new IllegalArgumentException("Appending Object is null or undefined!"));

        })

        it("Remove", () => {
            let name = new StringName("fau.cs");
            let name2 = new StringArrayName(["fau","cs"]);
            let name3 = new StringName("");
            let name4 = new StringArrayName([]);
          
            name.remove(0);
            expect(name.asString()).toBe("cs");
            expect(() => name.remove(3)).toThrow(new IllegalArgumentException("Index is out of bounce"));

            name2.remove(0);
            expect(name2.asString()).toBe("cs");
            expect(() => name.remove(3)).toThrow(new IllegalArgumentException("Index is out of bounce"));

            expect(() => name3.remove(0)).toThrow(new IllegalArgumentException("You cannot remove the last comp, set it to an empty component with the Set Function"));

            expect(() => name4.remove(0)).toThrow(new IllegalArgumentException("Removing Index is out of bounce")); 
        })
        

        it("Equality", () =>
        {
            let name1 = new StringName("Name");
            let name2 = new StringArrayName(["Name"]);
            
            expect(() => name1.isEqual(null as any)).toThrow(new IllegalArgumentException("Equality cannot be resolved: other is null/undefined"));
            expect(() => name2.isEqual(null as any)).toThrow(new IllegalArgumentException("Equality cannot be resolved: other is null/undefined"));    
        })


        it("Concat", () =>
        {
            let name1 = new StringName("Second");
            let name2 = new StringArrayName(["Try"]);
            
            name2.concat(name1);
            expect(name2.asString()).toBe("Try.Second");
            name1.concat(name2);
            expect(name1.asString()).toBe("Second.Try.Second");

            expect(() => name1.concat(null as any)).toThrow(new IllegalArgumentException("Cannot concat null/undefined"));
            expect(() => name2.concat(null as any)).toThrow(new IllegalArgumentException("Cannot concat null/undefined"));    
        })

        it("asString", () =>
        {
            let name1 = new StringName("Second");
            let name2 = new StringArrayName(["Try"]);

            expect(() => name1.asString(null as any)).toThrow(new IllegalArgumentException("Delimiter is null/undefined"));
            expect(() => name2.asString(null as any)).toThrow(new IllegalArgumentException("Delimiter is null/undefined"));
        })





    
}