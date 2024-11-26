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
			<div class="font-bold">Category</div>
			<div class="col-span-2">
				{$selectedOcrStore.category || "-"}
			</div>
		</div>
		<div>
			<div class="font-bold">Classification</div>
			<div class="col-span-2">
				{$selectedOcrStore.classification || "-"}
			</div>
		</div>
		<div>
			<div class="font-bold">Summary</div>
			<div class="col-span-2">
				{$selectedOcrStore.summary || "-"}
			</div>
		</div>
		<div>
			<div class="font-bold">Extraction Stage</div>
			<div class="col-span-2">
				{ocrStatus[$selectedOcrStore.currentStep].label}
			</div>
		</div>
		{#if $selectedOcrStore.relevantDates && $selectedOcrStore.relevantDates.length > 0}
			<div>
				<div class="font-bold">Relevant Dates</div>
				<div class="col-span-2">
					{#each $selectedOcrStore.relevantDates as { date, label }}
						<p class="text-xs"><span class="font-bold">{label}:</span> {date}</p>
					{/each}
				</div>
			</div>
		{/if}
		{#if $selectedOcrStore.contact && $selectedOcrStore.contact.length > 0}
			<div>
				<div class="font-bold">Contact</div>
				<div class="col-span-2">
					{#each $selectedOcrStore.contact as { fullName, number, email }}
						<div class="py-2 text-xs">
							<p class="font-bold">{fullName}</p>
							<p>{number || '-'} | {email || '-'}</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}
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
