export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jogaly.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin or sensitive paths (if any)
# Disallow: /admin
# Disallow: /api/private

# Allow specific paths for better indexing
Allow: /jogar/
Allow: /favicon.ico
Allow: /logojogaly2.png

# Additional sitemaps (if you have category-specific sitemaps in the future)
# Sitemap: ${baseUrl}/sitemap-games.xml
# Sitemap: ${baseUrl}/sitemap-categories.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400' // Cache por 24 horas
    }
  })
} 