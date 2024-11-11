import { writable } from "svelte/store"

export const isOcrListLoading = writable(false)
export const ocrListStore = writable([])
export const selectedOcrStore = writable()
export const lastEvalOcrStore = writable()
export const ocrStatusStore = writable()

export const ocrCountStore = writable()
