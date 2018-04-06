import EmoteObject from "./EmoteObject";
export default class EmoteObjectBuilder {
    static clone(source: EmoteObject): EmoteObject;
    static create(source: Partial<EmoteObject>): EmoteObject;
}
