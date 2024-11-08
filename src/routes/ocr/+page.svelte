<script>
	import * as Resizable from '$lib/components/ui/resizable';
	import Nav from './(components)/nav.svelte';
	import OcrList from './(components)/ocr-list.svelte';
	import { fetchPost } from '$lib/fetch-util';
	import { toast } from 'svelte-sonner';
	import {
		isOcrListLoading,
		lastEvalOcrStore,
		ocrListStore,
		ocrStatusStore,
		selectedOcrStore
	} from '$lib/stores/ocr';
	import OcrInfo from './(components)/ocr-info.svelte';

	let navCollapsedSize = 4;
	let defaultLayout = [150, 200, 655];
	let defaultCollapsed = false;
	let isCollapsed = defaultCollapsed;

	function onCollapse() {
		isCollapsed = true;
	}

	function onExpand() {
		isCollapsed = false;
	}

	const fetchRecords = async () => {
		isOcrListLoading.set(true);
		const { data, error } = await fetchPost({
			url: '/api/document/paginated',
			params: {
				status: $ocrStatusStore,
				lastEvaluatedKey: $lastEvalOcrStore
			}
		});

		if (error) {
			isOcrListLoading.set(false);
			toast.error(
				'We encountered an issue while reloading the data. Please try refreshing the page, or check your network connection if the issue persists.'
			);
		}
		if (data) {
			const { Items, LastEvaluatedKey } = data;
			lastEvalOcrStore.set(LastEvaluatedKey ?? null);
			if (Items && Items.length > 0) {
				if ($ocrListStore && $ocrListStore.length > 0) {
					const newList = [...$ocrListStore, ...Items];
					ocrListStore.set(newList);
				} else {
					ocrListStore.set(Items);
					selectedOcrStore.set($ocrListStore[0]);
				}
			} else {
				ocrListStore.set([]);
				lastEvalOcrStore.set(null);
				selectedOcrStore.set(null);
			}
		}
		isOcrListLoading.set(false);
	};
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full items-stretch rounded-lg border">
	<Resizable.Pane
		defaultSize={defaultLayout[0]}
		collapsedSize={navCollapsedSize}
		collapsible
		minSize={5}
		maxSize={20}
		{onCollapse}
		{onExpand}
	>
		<Nav {isCollapsed} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={15} maxSize={25}>
		<OcrList {fetchRecords} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />

	<Resizable.Pane defaultSize={defaultLayout[2]}>
		<OcrInfo />
	</Resizable.Pane>
</Resizable.PaneGroup>
