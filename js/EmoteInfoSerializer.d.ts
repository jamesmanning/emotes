import EmoteObject from "./EmoteObject";
export default class EmoteObjectSerializer {
    serialize(emoteObject: EmoteObject): string;
    private serializeTextParts(emoteObject);
    private serializeFlags(emoteObject);
}
