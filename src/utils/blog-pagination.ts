import { getEmDashCollection, getTermsForEntries } from "emdash";

export const POSTS_PER_PAGE = 6;

type PostEntry = Awaited<ReturnType<typeof getEmDashCollection>>["entries"][number];

export interface PostWithTags {
	post: PostEntry;
	tags: Array<{ slug: string; label: string }>;
	bylines: PostEntry["data"]["bylines"];
}

export interface BlogPage {
	postsWithTags: PostWithTags[];
	currentPage: number;
	hasNext: boolean;
	hasPrev: boolean;
}

/** Fetch one page (1-indexed) of published posts, newest first. */
export async function getBlogPage(pageNumber: number): Promise<BlogPage> {
	const offset = (pageNumber - 1) * POSTS_PER_PAGE;

	const { entries: posts } = await getEmDashCollection("posts", {
		orderBy: { published_at: "desc" },
		limit: POSTS_PER_PAGE + 1, // +1 to detect a next page
		offset,
	});

	const hasNext = posts.length > POSTS_PER_PAGE;
	const pagePosts = posts.slice(0, POSTS_PER_PAGE);

	const tagsByEntry = await getTermsForEntries(
		"posts",
		pagePosts.map((p) => p.data.id),
		"tag",
	);

	const postsWithTags = pagePosts.map((post) => ({
		post,
		tags: (tagsByEntry.get(post.data.id) ?? []).map((t) => ({
			slug: t.slug,
			label: t.label,
		})),
		bylines: post.data.bylines ?? [],
	}));

	return {
		postsWithTags,
		currentPage: pageNumber,
		hasNext,
		hasPrev: pageNumber > 1,
	};
}
