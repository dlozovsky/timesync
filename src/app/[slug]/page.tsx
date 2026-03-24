import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO_ROUTES, getSeoRouteBySlug } from "@/data/seo-routes";
import { canonicalUrl, ogImagePath } from "@/lib/site";
import Converter from "@/views/Converter";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = getSeoRouteBySlug(slug);
  if (!route) {
    return {};
  }
  const path = `/${slug}`;
  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: canonicalUrl(path),
    },
    openGraph: {
      title: route.title,
      description: route.description,
      type: "website",
      url: canonicalUrl(path),
      images: [{ url: ogImagePath }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@timesync",
      title: route.title,
      description: route.description,
      images: [ogImagePath],
    },
  };
}

export default async function SeoConverterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = getSeoRouteBySlug(slug);
  if (!route) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <Converter
        defaultZones={route.zones}
        seoContent={{
          heading: route.heading,
          body: route.content,
          pageTitle: route.title,
          pageDescription: route.description,
        }}
      />
    </Suspense>
  );
}
