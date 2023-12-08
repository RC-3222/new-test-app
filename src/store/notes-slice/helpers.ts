import { Note } from "../../types/notes";

export const combineNoteTags = (notes: Note[]) => {
    const allTags = [];

    for (const note of notes) {
        allTags.push(...note.tags);
    }

    return [...new Set(allTags)]
}