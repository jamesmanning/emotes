import EmoteObject from "./EmoteObject";
export default class EmoteObjectSerializer {
    serialize(emoteObject: EmoteObject): string;
    serializeTextParts(emoteObject: EmoteObject): string;
    serializeFlags(emoteObject: EmoteObject): string;
}
