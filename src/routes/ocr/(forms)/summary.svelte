<script>
	import { selectedOcrStore } from '$lib/stores/ocr';
	import { formatName, formatToFull } from '$lib/utils';
	import { ocrStatus } from '../config';
</script>

<div class="grid grid-cols-3 gap-2 p-2">
	<div class="col-span-2">
		<div class="relative h-[75vh] w-full cursor-grab overflow-hidden">
			<iframe
				src={$selectedOcrStore.url}
				class="h-full w-full"
				frameborder="0"
				title="Scrollable iframe content"
			></iframe>
		</div>
	</div>
	<div class="space-y-4 text-sm">
		<div>
			<div class="font-bold">File Name</div>
			<div class="col-span-2">
				{$selectedOcrStore.originalFilename}
			</div>
		</div>
		<div>
			<div class="font-bold">Extraction Stage</div>
			<div class="col-span-2">
				{ocrStatus[$selectedOcrStore.currentStep].label}
			</div>
		</div>
		<div>
			<div class="font-bold">Confidence Score</div>
			<div class="col-span-2">
				{$selectedOcrStore.confidence ? Math.floor($selectedOcrStore.confidence) : '-'}
			</div>
		</div>
		<div>
			<div class="font-bold">Date Uploaded</div>
			<div class="col-span-2">
				{formatToFull($selectedOcrStore.sk)}
			</div>
		</div>
		<div>
			<div class="font-bold">Account Name</div>
			<div class="col-span-2">
				{formatName($selectedOcrStore.form?.accountName)}
			</div>
		</div>
		<div>
			<div class="font-bold">Business Name</div>
			<div class="col-span-2">
				{formatName($selectedOcrStore.form?.businessName)}
			</div>
		</div>
	</div>
</div>
