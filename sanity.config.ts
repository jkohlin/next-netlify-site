// ./sanity.config.ts
'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const config = defineConfig({
    basePath: '/studio', // `basePath` must match the route of your Studio
    projectId,
    dataset,
    plugins: [structureTool()],
    schema: { types: [] }
});
