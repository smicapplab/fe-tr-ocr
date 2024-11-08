<script>
	import { selectedOcrStore } from '$lib/stores/ocr';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="p-2">
	<div class="bg-slate-200 px-2 py-5">
		Displays the OCR form (key/value) extraction results with minor static corrections applied, but
		without the benefit of AI-based adjustments. These results serve as a preliminary baseline,
		providing foundational data for subsequent model training and refinement
	</div>
</div>
