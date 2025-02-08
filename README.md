# Neen-Opal

This project is a graph visualization tool built with React, TypeScript, Vite, Redux, Tailwind CSS, and ReactFlow. It provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Redux**: A predictable state container for JavaScript apps.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **ReactFlow**: A library for building node-based editors and diagrams.
- **shadcn**: A component library for building accessible and customizable UI components.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Project Structure

- `eslint.config.js`: ESLint configuration.
- `README.md`: Project overview and setup instructions.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `components.json`: UI components configuration.
- `index.html`: Main HTML file.
- `package.json`: Project metadata and dependencies.
- `postcss.config.js`: PostCSS plugins configuration.
- `src/`: Source code directory.
  - `App.tsx`: Main App component.
  - `assets/`: Assets directory.
  - `colorPicker/`: Color picker component.
  - `components/`: UI components.
  - `fontSizeControl/`: Font size control component.
  - `graphContainer/`: Graph container components.
  - `lib/`: Utility functions.
  - `main.tsx`: Entry point for the React application.
  - `services/`: Service functions for graph and node styling.
  - `store/`: Redux store and slices.
  - `vite-env.d.ts`: TypeScript definitions for Vite.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.app.json`: TypeScript configuration for the application.
- `tsconfig.node.json`: TypeScript configuration for Node.js scripts.
- `tsconfig.json`: Base TypeScript configuration.
- `vite.config.ts`: Vite configuration.

## Running the Project

To run the project, use the following commands:

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build.

## License

This project is licensed under the MIT License.

## Repository

You can find the project repository on GitHub: [graph-visualization](https://github.com/chiragsuthar691/graph-visualization.git)
