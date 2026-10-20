# madie-auth

The single-spa Application responsible for the MADiE application's authorization/authentication logic.

## Local development

Run `npm start` to watch and rebuild the SystemJS bundle and serve it at
`http://localhost:8502/madie-madie-auth.js`. Load MADiE through madie-root as
usual. Set `PORT` to use another port. Refresh the browser after a successful
rebuild; the server does not provide hot module replacement or live reload.
It serves only build assets, enables cross-origin loading, and returns 503
until the current build succeeds rather than serving stale build output.

`npm test` runs the component tests and the local server tests. `npm run build`
produces the production bundle and TypeScript declarations.

## Dependency maintenance

- Tailwind/twin's four styles are maintained as equivalent scoped SCSS rules.
  There is no Tailwind stylesheet or preflight reset to migrate.
- The webpack preset explicitly uses `outputSystemJS: true`, preserving the
  import-map/SystemJS integration when upgrading the preset.
- `fork-ts-checker-webpack-plugin` is overridden to v9.1, which uses Chokidar 4
  instead of Chokidar 3 and its unpatched `braces` dependency.
- Okta's Chokidar dependency is also overridden to v4. This application consumes
  Okta's prebuilt browser widget; its Node filesystem watcher is not used by the
  sign-in flow. The override is scoped to Okta, not all Chokidar consumers.
  Reassess this override if Okta adds runtime watcher usage or removes the
  dependency.
