import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event)
    .sort({ date: -1 })
    .find()

  const items = docs
    .filter((doc: any) => doc._path?.startsWith('/blog/'))
    .map((doc: any) => `
    <item>
      <title><![CDATA[${doc.title}]]></title>
      <link>https://reincal.is-a.dev${doc._path}</link>
      <guid isPermaLink="true">https://reincal.is-a.dev${doc._path}</guid>
      <description><![CDATA[${doc.description || ''}]]></description>
      <pubDate>${new Date(doc.date).toUTCString()}</pubDate>
      <category>${doc.category || ''}</category>
    </item>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Natan Nobel — Blog</title>
    <link>https://reincal.is-a.dev/blog</link>
    <description>Thoughts on code, craft, and the occasional rant.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://reincal.is-a.dev/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  setResponseHeader(event, 'content-type', 'application/xml')
  return xml
})
