import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import webhookNotifier from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin()],
			sandboxed: [webhookNotifier],
			sandboxRunner: sandbox(),
			marketplace: "https://marketplace.emdashcms.com",
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
		{
			provider: fontProviders.local(),
			name: "Varsity Impact",
			cssVariable: "--font-varsity-impact",
			fallbacks: ["Impact", "sans-serif"],
			options: {
				variants: [
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Thin.otf"], weight: 100, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Extralight.otf"], weight: 200, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Light.otf"], weight: 300, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Regular.otf"], weight: 400, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Medium.otf"], weight: 500, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Semibold.otf"], weight: 600, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Bold.otf"], weight: 700, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Extrabold.otf"], weight: 800, style: "normal" },
					{ src: ["./src/assets/fonts/Varsity_impact/OTF/Varsity-Impact-Black.otf"], weight: 900, style: "normal" },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: "Aktiv Grotesk VF Trial",
			cssVariable: "--font-aktiv-grotesk",
			fallbacks: ["Helvetica Neue", "Arial", "sans-serif"],
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/AktivGroteskVF_Trial/AktivGroteskVF_Trial_WghtWdthItal.ttf"],
						weight: "100 900",
						stretch: "75% 125%",
						style: "normal",
						variationSettings: '"ital" 0',
					},
					{
						src: ["./src/assets/fonts/AktivGroteskVF_Trial/AktivGroteskVF_Trial_WghtWdthItal.ttf"],
						weight: "100 900",
						stretch: "75% 125%",
						style: "italic",
						variationSettings: '"ital" 1',
					},
				],
			},
		},
	],
	devToolbar: { enabled: false },
});
