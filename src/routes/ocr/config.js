import { Icons } from "$lib/components/ui/icons";
import { BookOpenCheck, BookText, FilePenLine, Grid3x3, Info, RefreshCcw } from "lucide-svelte";

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

export const infoMenus = [
	{
		title: "Summary",
		form: "summary",
		icon: Info,
		variant: "default",
	},
	{
		title: "Raw Extracted Tables",
		form: "rawTable",
		icon: Grid3x3,
		variant: "ghost",
	},
    {
		title: "Raw Extracted Forms",
		form: "rawForm",
		icon: BookText,
		variant: "ghost",
	},
    {
		title: "Digital Form",
		form: "form",
		icon: FilePenLine,
		variant: "",
	}
]