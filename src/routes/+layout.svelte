<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<div class="p-5 lg:p-10">
	<slot></slot>
</div>
<Toaster />
