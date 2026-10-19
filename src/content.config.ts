import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { ModelProjectSchema } from './lib/models/schema';

const models = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{yaml,yml,json}',
    base: './src/content/models',
  }),
  schema: ModelProjectSchema,
});

export const collections = {
  models,
};
