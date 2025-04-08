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
