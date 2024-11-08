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

export const formatTimeAgo = (date) => {
	const givenDate = new Date(date);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

	const pluralize = (value, unit) => {
		return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
	};

	if (diffInSeconds < 60) {
		return pluralize(diffInSeconds, 'second');
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return pluralize(diffInMinutes, 'minute');
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return pluralize(diffInHours, 'hour');
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return pluralize(diffInDays, 'day');
	}

	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) {
		return pluralize(diffInMonths, 'month');
	}

	const diffInYears = Math.floor(diffInDays / 365);
	return pluralize(diffInYears, 'year');
};

export const formatName = (name) => {
	if (!name) {
		return "";
	}

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

export const formatToFull = (dateString) => {
	// Convert the date string to a Date object (interpreted as UTC)
	const utcDate = new Date(dateString);

	// Manually adjust the UTC date to GMT+8
	// const gmt8Date = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

	// Format the date in the desired format
	const formatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return formatter.format(utcDate);
};