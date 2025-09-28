// ./src/app/studio/[[...tool]]/page.tsx

import { NextStudio } from 'next-sanity/studio';
import React from 'react';
import { config } from '@root/sanity.config'; /*
 * Update the import path to point to the correct location of sanity.config.ts.
 * Since your file is at:
 * /Users/kojo/kod/Egna/kohlin.net/next-netlify-site/app/studio/[[...tool]]/page.tsx
 * and sanity.config.ts is likely at the root of your project,
 * the correct relative path should be:
 * ../../../sanity.config
 */
export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
    return <NextStudio config={config} />;
}
