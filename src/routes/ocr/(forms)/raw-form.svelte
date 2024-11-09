<script>
	import { selectedOcrStore } from '$lib/stores/ocr';

	const camelCaseToLabel = (camelCaseStr) => {
		const label = camelCaseStr
			.replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters
			.replace(/(\d)([A-Za-z])/g, '$1 $2') // Insert space between numbers and letters
			.replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter

		// Add a colon at the end
		return `${label}:`;
	};
</script>

<div class="p-2">
	<div class="p-2">
		<div class="bg-slate-200 px-2 py-5">
			Displays the OCR form (key/value) extraction results with minor static corrections applied,
			but without the benefit of AI-based adjustments. These results serve as a preliminary
			baseline, providing foundational data for subsequent model training and refinement
		</div>
	</div>
	{#if $selectedOcrStore.form}
		<div class="grid grid-cols-4 space-x-3 py-5 text-sm">
			{#each Object.keys($selectedOcrStore.form) as key}
				<div class="font-bold">{camelCaseToLabel(key)}</div>
				<div class="col-span-3">{$selectedOcrStore.form[key] || '-'}</div>
			{/each}
		</div>
	{/if}
</div>
