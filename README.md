# sv

Everything need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Installation of Libraries

To complete the app, you need to install some libraries:

- Tailwind CSS: To enable utility classes from Tailwind CSS, install the package using NPM:

```bash
npx svelte-add@latest tailwindcss
npm i
```

- Flowbite Svelte Components: Run the following command to install all Flowbite dependencies and libraries:

```bash
npm i -D flowbite-svelte flowbite
```

- Flowbite Svelte Icons: Install Flowbite Svelte icons for using icons in the app:

```bash
npm i -D flowbite-svelte-icons
```

- OpenLayers: Install the OpenLayers package for integrating maps into the app:

```bash
npm install ol
```

## Configuration

Update the tailwind.config.cjs file in the root project folder to let the Tailwind CSS compiler know where to look for utility classes and also set up the Flowbite plugin.

> To deploy app, may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for target environment.
