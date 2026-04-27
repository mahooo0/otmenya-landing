import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/logo", "/coming-soon"],
      },
    ],
    sitemap: "https://otmenya.holy-water.app/sitemap.xml",
  };
}
