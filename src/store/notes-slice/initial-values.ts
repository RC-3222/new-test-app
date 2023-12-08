import { LOCALSTORAGE_NOTES_KEY } from "../../constants/local-storage";

const storedValue = localStorage.getItem(LOCALSTORAGE_NOTES_KEY);
const initialNoteList = storedValue ? JSON.parse(storedValue) : [
    {
        title: 'Example Note',
        text: 'this is an #example note',
        id: 'testNote',
        tags: ['#example']
    },
]

const initialTags:string[] = [];
for (const note of initialNoteList) {
    initialTags.push(...note.tags);
}

export { initialTags, initialNoteList }