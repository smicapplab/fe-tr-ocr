<script>
	import { selectedOcrStore } from '$lib/stores/ocr';
	import * as Table from '$lib/components/ui/table/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { cn } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fetchPost } from '$lib/fetch-util';

	let aveScore = 0;

	// Compute the average confidence score when the store data changes
	$: if ($selectedOcrStore?.handwritten?.length > 0) {
		const totalScore = $selectedOcrStore.handwritten.reduce(
			(acc, { confidence }) => acc + confidence,
			0
		);
		aveScore = totalScore / $selectedOcrStore.handwritten.length;
	} else {
		aveScore = 0;
	}

	const badgeBg = {
		Good: 'bg-green-500',
		Fair: 'bg-amber-500',
		Bad: 'bg-red-500',
		'Very Bad': 'bg-red-800'
	};

	const getConfidenceCategory = (confidence) => {
		if (confidence >= 80) return 'Good';
		if (confidence >= 60) return 'Fair';
		if (confidence >= 40) return 'Bad';
		return 'Very Bad';
	};

	const parseData = async () => {
		const {data, error} = await fetchPost({
			url: `/api/document/parse`,
			params: {
				jobId: $selectedOcrStore.gsi1pk
			}
		})
	};
</script>

<div class="p-2">
	<div class="bg-slate-200 px-2 py-5">
		Displays the results of recognizing handwritten text by tracing irregular polygons around
		detected areas and evaluating the legibility of the content. Handwritten analysis results can be
		used for overrides that feed into the credit model. Note: Spell corrections, typo fixes, and
		AI-driven context analysis are not applied in this demo.
	</div>

	{#if $selectedOcrStore.handwritten}
		<h1 class={cn('p-2 py-5 text-lg text-white', badgeBg[getConfidenceCategory(aveScore)])}>
			Ave Score: {aveScore}
		</h1>

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Page</Table.Head>
					<Table.Head>Sentence</Table.Head>
					<Table.Head>Confidence Score</Table.Head>
					<Table.Head>Category</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each $selectedOcrStore.handwritten as { sentence, page, confidence }}
					{@const category = getConfidenceCategory(confidence)}
					<Table.Row class="w-full text-sm">
						<Table.Cell>{page}</Table.Cell>
						<Table.Cell>{sentence}</Table.Cell>
						<Table.Cell>{confidence}</Table.Cell>
						<Table.Cell>
							<Badge class={badgeBg[category]}>{category}</Badge>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{:else}
		<Button on:click={parseData}>Fetch</Button>
	{/if}
</div>
