import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/backgrounds")({
  beforeLoad: () => {
    throw redirect({ to: "/bells", replace: true });
  },
  head: () => ({
    meta: [
      { title: "Backgrounds — Tinglet" },
      {
        name: "description",
        content:
          "Pick a background for your bell: soft gradients, marble and stone, nature, minimal colours, festive scenes and dark moody tones.",
      },
      { property: "og:title", content: "Backgrounds — Tinglet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Choose a beautiful background. Applied instantly and remembered.",
      },
    ],
  }),
  component: () => null,
});
