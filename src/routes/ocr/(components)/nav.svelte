<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index';
	import { Icons } from '$lib/components/ui/icons';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { derived } from 'svelte/store';
	import Divider from '$lib/components/ui/divider/divider.svelte';
	import { fetchPost } from '$lib/fetch-util';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { ocrCountStore } from '$lib/stores/ocr';
	export let isCollapsed;

	let isImgLoading = false;

	const routes = [
		{
			value: 'all',
			label: 'All',
			icon: Icons.list
		},
		{
			value: 'recent',
			label: 'Recent',
			icon: Icons.fileClock
		},
		{
			value: 'low-confidence',
			label: 'Low Confidence',
			icon: Icons.warning
		},
		{
			value: 'done',
			label: 'Done',
			icon: Icons.fileCheck
		},
		{
			value: 'failed',
			label: 'Failed',
			icon: Icons.circleSlash
		}
	];

	const status = derived(page, ($page) => {
		return $page.url.searchParams.get('status') || 'all';
	});

	const limit = derived(ocrCountStore, ($ocrCountStore) => 52 - $ocrCountStore);

	const showToastError = (name) => {
		toast.error(
			`Oops! We ran into an issue uploading your file "${name}". Please check your connection and try again.`
		);
	};

	const updateCount = async () => {
		const { data: countData } = await fetchPost({
			url: '/api/document/count'
		});
		ocrCountStore.set(countData.data);
	};

	const handleFileChange = async (event) => {
		isImgLoading = true;
		const target = event.target;
		const files = target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const { name } = file;
			const { data, error } = await fetchPost({
				url: `/api/upload/`,
				params: { name }
			});

			if (error) {
				showToastError(name);
				isImgLoading = false;
			}

			if (data) {
				const { presignedUrl, fileId, fileName, fileType } = data;
				const response = await fetch(presignedUrl, {
					method: 'PUT',
					headers: {
						'Content-Type': file.type
					},
					body: file
				});

				if (response.ok) {
					const { data: trigger, error: triggerErr } = await fetchPost({
						url: '/api/document',
						params: {
							name,
							fileId,
							fileName,
							fileType
						}
					});

					if (triggerErr) {
						showToastError(name);
						isImgLoading = false;
					} else {
						toast.success(
							`Great! "${name}" uploaded successfully. Parsing may take around 3-5 minutes, so feel free to continue working while we process your file.`
						);
						isImgLoading = false;
						await goto('/ocr?status=recent');
						location.reload();
					}

					await updateCount();
				} else {
					showToastError(name);
					isImgLoading = false;
				}
			}
		}
	};

	onMount(async () => {
		await updateCount();
	});
</script>

{#if isCollapsed}
	<div class="bg-background/95 bg-slate-100 p-2 py-7 backdrop-blur">
		<div
			data-collapsed={isCollapsed}
			class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav
				class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
			>
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger asChild let:builder>
						<!-- Label to trigger file input -->
						<label for="cam-file" class="cursor-pointer">
							<Button
								builders={[builder]}
								variant="outline"
								size="icon"
								class={cn('size-9', 'bg-white')}
							>
								<Icons.fileUp class="size-5" aria-hidden="true" />
							</Button>
						</label>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" class="flex items-center gap-4 bg-neutral-600 text-white">
						Upload Unstructired/Untrained Document
					</Tooltip.Content>
				</Tooltip.Root>
			</nav>
		</div>
		<input id="cam-file" type="file" class="hidden" />
	</div>
{:else}
	<div class="bg-background/95 bg-slate-100 p-2 backdrop-blur">
		<div class="flex items-center">
			<div class="relative flex-grow">
				<Label for="cam-file" class="overflow-hidden text-ellipsis whitespace-nowrap font-bold"
					>Upload Unstructired/Untrained Document</Label
				>
				{#if isImgLoading}
					<div class="flex w-full animate-pulse justify-center py-2 align-middle text-primary">
						<span class="mr-1 animate-pulse">Uploading</span>
						<Icons.loaderPinwheel class="h-6 w-6 animate-spin" />
					</div>
				{:else}
					<Input
						disabled={$limit <= 0}
						id="cam-file"
						type="file"
						class="custom-file-input"
						on:change={handleFileChange}
						placeholder="xxx"
					/>
				{/if}
			</div>
		</div>
		<span class="overflow-hidden text-ellipsis whitespace-nowrap text-xs italic"
			>Click browse to upload document</span
		>
	</div>
{/if}

<Divider class="mb-5" />

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		{#each routes as route}
			{#if isCollapsed}
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="ghost"
							size="icon"
							class={cn(
								'size-9 ',
								route.value === $status ? ' bg-neutral-600 text-white' : 'bg-white'
							)}
							on:click={() => goto(`/ocr?status=${route.value}`)}
						>
							<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" class="flex items-center gap-4 bg-neutral-600 text-white">
						{route.label}
					</Tooltip.Content>
				</Tooltip.Root>
			{:else}
				<Button
					variant="ghost"
					size="sm"
					class={cn(
						'justify-start',
						route.value === $status ? ' bg-neutral-600 text-white' : 'bg-white'
					)}
					on:click={() => goto(`/ocr?status=${route.value}`)}
				>
					<svelte:component this={route.icon} class="mr-2 size-4" aria-hidden="true" />
					{route.label}
				</Button>
			{/if}
		{/each}

		<!-- {#if !isCollapsed}
			{#if $ocrCountStore}
				<div class="py-10 text-center text-xs">
					<div class="bg-orange-50 p-2 text-center text-xs">
						{$limit} uploads left
					</div>
				</div>
			{/if}
		{/if} -->
	</nav>
</div>
