import { writable } from "svelte/store"

export const ocrListStore = writable([])

export const selectedOcrStore = writable()
export const lastEvalOcrStore = writable()