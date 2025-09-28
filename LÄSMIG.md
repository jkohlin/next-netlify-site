# installerade Next Netlify så här:

`git clone git@github.com:jkohlin/next-netlify-site.git`
`cd next-netlify-site`
`$ npm install netlify-cli@latest -g`
`$ netlify link`

```bash
netlify link will connect this folder to a site on Netlify

? How do you want to link this folder to a site? Enter a site ID
? What is the site ID? ca0a47aa-0269-4ac9-918e-185690e8a701

Directory Linked

Admin url: https://app.netlify.com/sites/kohlin-net
Site url:  https://kohlin.net

You can now run other `netlify` cli commands in this directory
```

`$ netlify dev`

# 2. Lägg till (Installera) Sanity till sajten:

`npm install next-sanity @sanity/client @portabletext/react @sanity/image-url`

This also installs @sanity/image-url for On-Demand Image Transformations to render images from Sanity's CDN.

## Läs mer här:

https://www.sanity.io/plugins/next-sanity#installation

## Sanity Studio säger:

Name: kohlin-site
Initialize your project with the CLI:
`npm create sanity@latest -- --project idtqydcj --dataset production --template clean`

# 3. Manual configuration

1. Skapa `.env.local`

```
    NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
    NEXT_PUBLIC_SANITY_DATASET=<your-dataset-name>
```

2. Skapa `./src/sanity/env.ts`

```ts
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;

// Values you may additionally want to configure globally
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-11';
```

# 4. Write GROQ queries

next-sanity exports the defineQuery function which will give you syntax highlighting in VS Code with the Sanity extension installed. It’s also used for GROQ query result type generation with Sanity TypeGen.

Skapa `./src/sanity/lib/queries.ts`

```ts
import { defineQuery } from 'next-sanity';

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
    _id, title, slug
    }`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
    title, body, mainImage
    }`);
```

# 4 Generate TypeScript Types

You can use Sanity TypeGen to generate TypeScript types for your schema types and GROQ query results in your Next.js application. It should be readily available if you have used sanity init and chosen the embedded Studio.

[!TIP] Sanity TypeGen will create Types for queries that are assigned to a variable and use the groq template literal or defineQuery function.

If your Sanity Studio schema types are in a different project or repository, you can configure Sanity TypeGen to write types to your Next.js project.

Create a sanity-typegen.json file at the root of your project to configure Sanity TypeGen:

Skapa `sanity-typegen.json`

```json
{
  "path": "./src/**/*.{ts,tsx,js,jsx}",
  "schema": "./src/sanity/extract.json",
  "generates": "./src/sanity/types.ts"
}
```

Note: This configuration is strongly opinionated that the generated Types and the schema extraction are both within the /src/sanity directory, not the root which is the default. This configuration is complimented by setting the path of the schema extraction in the updated package.json scripts below.

Run the following command in your terminal to extract your Sanity Studio schema to a JSON file

```bash
# Run this each time your schema types change
npx sanity@latest schema extract
```

Run the following command in your terminal to generate TypeScript types for both your Sanity Studio schema and GROQ queries

```bash
# Run this each time your schema types or GROQ queries change
npx sanity@latest typegen generate
```

Update your Next.js project's package.json to perform both of these commands by running npm run typegen
#package.json:

```json
"scripts": {
  "predev": "npm run typegen",
  "dev": "next",
  "prebuild": "npm run typegen",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typegen": "sanity schema extract --path=src/sanity/extract.json && sanity typegen generate"
},
```

# 5. Using query result types

Sanity TypeGen creates TypeScript types for the results of your GROQ queries.

```ts
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { POSTS_QUERYResult } from '@/sanity/types';
const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY);
```

However, it is much simpler to use automatic type inference. So long as your GROQ queries are wrapped in defineQuery, the results should be inferred automatically:

```ts
import { POSTS_QUERY } from '@/sanity/lib/queries';
const posts = await client.fetch(POSTS_QUERY);
```

# 6. Configuring Sanity Client

To interact with Sanity content in a Next.js application, we recommend creating a client.ts file:

```ts
// ./src/sanity/lib/client.ts
import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true // Set to false if statically generating pages, using ISR or tag-based revalidation
});
```

# 7. Fetching in App Router Components

To fetch data in a React Server Component using the App Router you can await results from the Sanity Client inside a server component:

```ts
// ./src/app/page.tsx

    import {client} from '@/sanity/lib/client'
    import {POSTS_QUERY} from '@/sanity/lib/queries'

    export default async function PostIndex() {
    const posts = await client.fetch(POSTS_QUERY)

    return (
        <ul>
        {posts.map((post) => (
            <li key={post._id}>
            <a href={`/posts/${post?.slug.current}`}>{post?.title}</a>
            </li>
        ))}
        </ul>
    )
    }
```

Fortsätt att läsa om Sanity här: https://arc.net/l/quote/nujlorki (Should useCdn be true or false? etc)

Att göra:

- [ ] Bygg upp en hotellsajt med Sanity och Next.js lokalt med project ID: c72tvlp5
- [ ] Nollställ kohlin.net -template innehåll (Can't resolve 'components/feedback-form' ) ./app/classics/page.jsx:1:1
