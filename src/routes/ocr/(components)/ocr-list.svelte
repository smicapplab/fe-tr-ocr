<script>
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index';
	import { ocrListStore, selectedOcrStore } from '$lib/stores/ocr';
	import { cn } from '$lib/utils';
	import { derived, writable } from 'svelte/store';
	import { fetchGet } from '$lib/fetch-util';
	import { Icons } from '$lib/components/ui/icons';
	import { Plus } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { onMount } from 'svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Divider } from '$lib/components/ui/divider';
	import { Dialog } from '$lib/components/ui/dialog';
	import { DialogContent } from '$lib/components/ui/dialog';
	import { DialogHeader } from '$lib/components/ui/dialog';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';

	export let fetchRecords;

	let isDialogOpen = writable(false);
	let searchKey = '';
	let isLoading = false;
	let cursor = 0;
	let hasMore = false;
	let totalCount = 0;

	const status = derived(page, ($page) => $page.url.searchParams.get('status') || '');
	const openDialog = () => {
		isDialogOpen.set(true);
	};

	const closeDialog = async () => {
		isDialogOpen.set(false);
	};

	const fetchBanks = async () => {
		// isLoading = true;
		// const { data } = await fetchGet(
		// 	`/api/bank?name=${searchKey}&status=${$status}&cursor=${cursor}`
		// );
		// const { banks, count } = data;
		// totalCount = count;
		// if (banks) {
		// 	if (cursor === 0) {
		// 		ocrListStore.set(banks);
		// 		selectedOcrStore.set($ocrListStore[0]);
		// 	} else {
		// 		const newList = [...$ocrListStore, ...banks];
		// 		ocrListStore.set(newList);
		// 	}

		// 	if ($ocrListStore.length === 0) {
		// 		selectedOcrStore.set(null);
		// 		hasMore = false;
		// 	} else {
		// 		hasMore = count > $ocrListStore.length;
		// 	}
		// }

		isLoading = false;
	};

	// const fetchRecords = async () => {
	// 	isLoading = true;
	// 	const { data, error } = await fetchGet('/api/document');
	// 	if (error) {
	// 		toast.error(
	// 			'We encountered an issue while reloading the data. Please try refreshing the page, or check your network connection if the issue persists.'
	// 		);
	// 	}
	// 	ocrListStore.set(data);
	// 	isLoading = false;
	// };

	// const loadMore = async () => {
	// 	cursor++;
	// 	await fetchBanks();
	// };

	$: if ($status) {
		if (browser) {
			fetchRecords();
		}
	}

	onMount(() => {
		fetchRecords();
	});
</script>

<div class="bg-background/95 bg-slate-100 p-2 backdrop-blur">
	<form>
		<Label for="picture" class="font-bold">Search</Label>
		<div class="flex items-center">
			<div class="relative flex-grow">
				<Icons.search
					class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
				/>
				<Input class="w-full pl-8" bind:value={searchKey} />
			</div>
		</div>
	</form>
	<span class="overflow-hidden text-ellipsis whitespace-nowrap text-xs italic"
		>Enter Customer name and hit 'Enter' to search.</span
	>
</div>

<Divider class="mb-10" />
<!-- {#if totalCount > 0}
	<div class="flex items-center justify-between px-3 py-2 text-sm">
		<div>
			showing {$ocrListStore?.length || 0} of {totalCount || 0}
		</div>
		{#if hasMore}
			<Button variant="link" size="xs" on:click={loadMore} class="flex items-center">
				Load More
				{#if isLoading}
					<Icons.loaderPinwheel class="ml-1 h-4 animate-spin" />
				{:else}
					<Icons.download class="ml-1 h-4" />
				{/if}
			</Button>
		{/if}
	</div>
{:else if !isLoading}
	<div class="mt-5 px-3 text-center text-secondary">No Records found</div>
{/if} -->

<ScrollArea class="max-h-screen-minus-400 h-full">
	<div class="flex flex-col gap-2 p-2 pt-2">
		<!-- { originalFilename, currentStep, pk, sk, url } -->
		{#if $ocrListStore && $ocrListStore.length > 0}
			{#each $ocrListStore as item}
				<button
					class={cn(
						'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
						$selectedOcrStore.sk === item.sk && 'bg-muted'
					)}
					on:click={() => selectedOcrStore.set(item)}
				>
					<div class="flex w-full flex-col gap-1">
						<div class="flex items-center">
							<div class="flex items-center gap-2">
								<div class="font-semibold text-xs">{item.originalFilename}</div>
							</div>
							<div
								class={cn(
									'ml-auto text-xs',
									$selectedOcrStore.sk === item.sk ? 'text-foreground' : 'text-muted-foreground'
								)}
							></div>
						</div>
					</div>
					<Badge variant="outline">{item.currentStep}</Badge>
				</button>
			{/each}
		{/if}
	</div>
</ScrollArea>
