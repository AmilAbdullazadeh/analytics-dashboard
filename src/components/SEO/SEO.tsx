import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
}

export function SEO({ title, description, canonical, openGraph }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={openGraph?.title || title} />
      <meta
        property="og:description"
        content={openGraph?.description || description}
      />
      {openGraph?.image && (
        <meta property="og:image" content={openGraph.image} />
      )}
      {openGraph?.url && <meta property="og:url" content={openGraph.url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://api.yourdomain.com" />
    </Helmet>
  );
}
