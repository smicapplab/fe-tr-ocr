<script>
	import { ScrollArea } from '$lib/components/ui/scroll-area/index';
	import { selectedOcrStore } from '$lib/stores/ocr';
	import * as Tabs from '$lib/components/ui/tabs';
	import { infoMenus } from '../config';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { formatName, formatToFull } from '$lib/utils';

	let selectedTab = infoMenus[0].form;
</script>

{#if $selectedOcrStore}
	<div class="px-2 py-5">
		<Tabs.Root bind:value={selectedTab}>
			<Tabs.List class="space-x-2 bg-white">
				{#each infoMenus as route}
					<Tabs.Trigger value={route.form} class="border-none bg-white p-0">
						<Tooltip.Root openDelay={0}>
							<Tooltip.Trigger asChild let:builder>
								<Button
									builders={[builder]}
									variant="ghost"
									class="gap-2 rounded-lg p-5 text-black {selectedTab === route.form
										? ' bg-neutral-600 text-white'
										: ''} "
								>
									<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
									{route.title}
								</Button>
							</Tooltip.Trigger>
						</Tooltip.Root>
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</Tabs.Root>
	</div>

	<div class="p-5">
		<ScrollArea class="h-full max-h-screen-minus-100">
			<div class="grid grid-cols-3 gap-2">
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
							{$selectedOcrStore.currentStep}
						</div>
					</div>
					<div>
						<div class="font-bold">Confidence Score</div>
						<div class="col-span-2">...</div>
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
		</ScrollArea>
	</div>
{/if}
