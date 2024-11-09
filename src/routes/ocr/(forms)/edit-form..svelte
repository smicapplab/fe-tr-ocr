<script>
	import { selectedOcrStore } from '$lib/stores/ocr';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="p-2">
	<div class="bg-slate-200 px-2 py-5">
		Displays the final OCR table extraction with AI and context-based corrections applied. While
		significantly improved, the model still requires additional data for further training and
		optimization.
	</div>
</div>

<div class="flex items-center justify-center text-center py-40">
    Insufficient data to train the LLM model. Additional OCR-processed files are required to optimize and fine-tune the engine.
</div>