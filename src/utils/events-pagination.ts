import { getEmDashCollection } from "emdash";

export const EVENTS_PER_PAGE = 6;

export interface EventsPage {
	events: Awaited<ReturnType<typeof getEmDashCollection>>["entries"];
	currentPage: number;
	hasNext: boolean;
	hasPrev: boolean;
}

/** Fetch one page (1-indexed) of published events, newest first. */
export async function getEventsPage(pageNumber: number): Promise<EventsPage> {
	const offset = (pageNumber - 1) * EVENTS_PER_PAGE;

	const { entries } = await getEmDashCollection("events", {
		orderBy: { created_at: "desc" },
		limit: EVENTS_PER_PAGE + 1, // +1 to detect a next page
		offset,
	});

	const hasNext = entries.length > EVENTS_PER_PAGE;
	const events = entries.slice(0, EVENTS_PER_PAGE);

	return {
		events,
		currentPage: pageNumber,
		hasNext,
		hasPrev: pageNumber > 1,
	};
}
