import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const flyAndScale = (
	node,
	params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (valueA, scaleA, scaleB) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};


const DIVISIONS = [
	{ amount: 60, name: "seconds" },
	{ amount: 60, name: "minutes" },
	{ amount: 24, name: "hours" },
	{ amount: 7, name: "days" },
	{ amount: 4.34524, name: "weeks" },
	{ amount: 12, name: "months" },
	{ amount: Number.POSITIVE_INFINITY, name: "years" },
];

const formatter = new Intl.RelativeTimeFormat(undefined, {
	numeric: "auto",
});

export const formatTimeAgo = (date) => {
	console.log("---", date)
	// Adjust date from UTC to GMT-8 by subtracting 8 hours
	const adjustedDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);
	console.log("---", adjustedDate)
	let duration = (adjustedDate.getTime() - new Date().getTime()) / 1000;
	console.log("---", duration)
	for (let i = 0; i <= DIVISIONS.length; i++) {
		const division = DIVISIONS[i];
		console.log("---", division)
		if (Math.abs(duration) < division.amount) {
			return formatter.format(Math.round(duration), division.name);
		}
		duration /= division.amount;
	}
}

export const formatName = (name) => {
	return name
	  .toLowerCase() // Convert entire string to lowercase
	  .split(' ') // Split by spaces
	  .map((word) => {
		// Capitalize the first letter of each word
		if (word.length > 1) {
		  return word.charAt(0).toUpperCase() + word.slice(1);
		}
		// Handle initials (like "N.")
		return word.toUpperCase();
	  })
	  .join(' '); // Join the words back into a string
  }