import { BookOpenCheck, RefreshCcw } from "lucide-svelte";

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
    "PARTIAL:RESOLVED": {
        label: "Extracted",
        icon: BookOpenCheck
    },
}