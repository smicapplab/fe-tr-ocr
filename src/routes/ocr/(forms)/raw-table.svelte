<script>
	import { selectedOcrStore } from '$lib/stores/ocr';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="p-2">
	<div class="bg-slate-200 px-2 py-5">
		Displays the OCR table extraction results with minor static corrections applied, but without
		AI-based adjustments. This data serves as a preliminary baseline for model training and further
		refinement.
	</div>
	{#if $selectedOcrStore.table}
		{#each $selectedOcrStore.table as table}
			<div class="py-5">
				<Card.Root class="w-full">
					<Card.Content>
						<Table.Root>
							<Table.Body>
								{#each table as tableItem}
									<Table.Row class="w-full text-sm">
										{#each tableItem as row}
											<Table.Cell>{row}</Table.Cell>
										{/each}
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</Card.Content>
				</Card.Root>
			</div>
		{/each}
	{/if}
</div>
