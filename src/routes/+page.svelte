<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { fetchPost } from '$lib/fetch-util';
	import { redirect } from '@sveltejs/kit';

	/**
	 * @type {any}
	 */
	let passCode;
	/**
	 * @type {{} | null}
	 */

	let errorMsg;
	let shake = false;

	const verify = async () => {
		errorMsg = null;
		const { data, error } = await fetchPost({
			url: '/api/auth',
			params: {
				passCode
			}
		});

		if (error) {
			errorMsg = 'You have entered an incorrect passcode';
			shake = true; // Trigger shake animation

			// Reset the `shake` state after a short delay to re-trigger the animation on each attempt
			setTimeout(() => {
				shake = false;
			}, 500);
		} else {
			goto("/ocr")
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card.Root class={`w-[350px] ${shake ? 'animate-shake' : ''}`}>
		<Card.Header>
			<Card.Title>Please Enter Passcode</Card.Title>
			<Card.Description>
				This device is not recognized or authorized to access the demo app. Please enter the
				passcode to proceed.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Input
						id="name"
						placeholder="Enter passcode"
						bind:value={passCode}
						class={errorMsg && 'border border-red-500'}
					/>
				</div>
			</div>
			{#if errorMsg}
				<div class="grid w-full items-center gap-4 text-red-500">
					{errorMsg}
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button on:click={verify}>Verify</Button>
		</Card.Footer>
	</Card.Root>
</div>
