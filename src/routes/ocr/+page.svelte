<script>
	import * as Resizable from '$lib/components/ui/resizable';
	import Nav from './(components)/nav.svelte';
	import OcrList from './(components)/ocr-list.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { fetchGet } from '$lib/fetch-util';
	import { toast } from 'svelte-sonner';
	import { ocrListStore, selectedOcrStore } from '$lib/stores/ocr';

	let navCollapsedSize = 4;
	let defaultLayout = [150, 160, 655];
	let defaultCollapsed = false;
	let isCollapsed = defaultCollapsed;

	function onCollapse() {
		isCollapsed = true;
	}

	function onExpand() {
		isCollapsed = false;
	}

	const fetchRecords = async () => {
		const { data, error } = await fetchGet('/api/document');
		if (error) {
			toast.error(
				'We encountered an issue while reloading the data. Please try refreshing the page, or check your network connection if the issue persists.'
			);
		}
		ocrListStore.set(data);
		selectedOcrStore.set(data[0])
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
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={15} maxSize={20}>
		<OcrList {fetchRecords} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />

	<Resizable.Pane defaultSize={defaultLayout[2]}>xxxx</Resizable.Pane>
</Resizable.PaneGroup>
