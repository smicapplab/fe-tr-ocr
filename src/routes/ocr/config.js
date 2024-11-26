import { Album, BookOpenCheck, BookText, BookUp2, FilePenLine, Grid3x3, Info, NotebookPen, RefreshCcw, Shapes } from "lucide-svelte";

export const ocrStatus = {
    PENDING: {
        label: "Processing",
        icon: RefreshCcw
    },
    "PARTIAL:BLOCKS": {
        label: "Processing",
        icon: RefreshCcw
    },
    "PARTIAL:PARSED": {
        label: "Extracted",
        icon: BookOpenCheck
    },
    "PARTIAL:REFINED": {
        label: "Extracted & Refined",
        icon: BookUp2
    },
    "PARTIAL:RESOLVED": {
        label: "Extracted",
        icon: Album
    },
    "PARTIAL:CLASSIFIED": {
        label: "Classified",
        icon: Shapes
    },
}

export const infoMenus = [
    {
        title: "Summary",
        form: "summary",
        icon: Info,
        variant: "default",
    },
    {
        title: "Raw Tables",
        form: "rawTable",
        icon: Grid3x3,
        variant: "ghost",
    },
    {
        title: "Raw Forms",
        form: "rawForm",
        icon: BookText,
        variant: "ghost",
    },
    {
        title: "Handwritten",
        form: "handwritten",
        icon: NotebookPen,
        variant: "ghost",
    },
    {
        title: "Digital Form",
        form: "editForm",
        icon: FilePenLine,
        variant: "",
    }
]