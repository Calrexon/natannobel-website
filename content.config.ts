import { z } from 'zod'
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        category: z.string().optional(),
        author: z.string().optional(),
        date: z.string().optional(),
      }),
    }),
  },
})
