<script>
	import { selectedOcrStore } from '$lib/stores/ocr';
	import * as Tabs from '$lib/components/ui/tabs';
	import { infoMenus } from '../config';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Forms } from '../(forms)/form';
	let selectedTab = infoMenus[0].form;
</script>

{#if $selectedOcrStore}
	<div class="px-2 py-5">
		<Tabs.Root bind:value={selectedTab}>
			<Tabs.List class="space-x-2 bg-white">
				{#each infoMenus as route}
					<Tabs.Trigger value={route.form} class="border-none bg-white p-0">
						<Button
							variant="ghost"
							class="gap-2 rounded-lg p-5 text-black {selectedTab === route.form
								? ' bg-neutral-600 text-white'
								: ''} "
						>
							<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
							{route.title}
						</Button>
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
			{#each infoMenus as route}
				<Tabs.Content value={route.form}>
					<div class="flex h-full flex-1 flex-col overflow-hidden">
							<div class="py-5">
								<svelte:component this={Forms[route.form]} />
							</div>
					</div>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</div>
{/if}
