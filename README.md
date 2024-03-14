# 🦁 Lucky Leo

## Demo for a simple Nuxt app

Here we go. I built a simple Nuxt app to display the latest Eurojackpot draw results. I added a logo and a couple of custom animations and transitions just for fun.

## How to run the app

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser and go to `http://localhost:3000`
5. Enjoy!

## Pages

- Home
- Eurojackpot draws (lists the last 16 draw dates / 8 weeks)
- Eurojackpot draw (details for a single draw)

## Components

- Header with meta data
- Basic Teaser with `<slot />`
- Numbers (with custom animations)
- Various SVG files (inlined as components)
- Odds

## CSS

- no CSS framework
- SCSS preprocessing via nuxt
- using very basic media queries for responsiveness (in a real world scenario I would add a CSS framework or add a more sophisticated grid system)
- CSS is split into global definitions and scoped component specific styles, imports are used to get access to global scss variables and mixins
- added some custom animations and transitions

## GraphQL

- used apollo client to fetch data from lottohelden.de

## Proxy

- using nitro instead of @nuxtjs/proxy (see https://www.youtube.com/watch?v=J4E5uYz5AY8 for issues with other proxy solutions)

## State Management

- no state management used
- apollo client caches graphql queries by default

## Rendering

- the app is rendered in dev mode
- for server side rendering a couple of changes would be necessary

## External assets

- not using any external assets (except for the lottohelden.de graphql endpoint)
- not using any custom fonts
- all SVG files are inlined as components

## Testing

- `npm run test` to run the tests
- added a couple of basic tests for the pages
- TODO: add async tests for eurojackpot/[date].vue

## Clean Code

- did my best to keep the code clean and readable
