# hearts-of-iron-4-focus-trees-inverter

## Usage

### Install dependencies

```bash
npm ci
```

### Edit the code

You can edit the code in the `src` directory.
The entry point of your application is `src/main.ts`.

### Run the application in development mode

```bash
npm run dev
```

Note: The project uses [ts-node](https://www.npmjs.com/package/ts-node) to run TypeScript code on the fly.

### Compile the application

```bash
npm run compile
```

This will create a `dist` directory with the compiled code.

Note: The `dist` directory will mimic the main directory structure. All directories with TypeScript files will be recreated in the `dist` directory. In the default configuration those are `src` and `test`.

### Run the compiled application

```bash
npm run start
```

Note: This will command will fail if the application has not been compiled (no `dist` directory)!

### Test the application

The tests can be found in the `test` directory.
[Vitest](https://www.npmjs.com/package/vitest) is used to run and write the tests.

```bash
npm run vitest:check
```

This will run the tests and also providing a tabular code coverage report.
An HTML code coverage report will be also generated in the `coverage_report` directory.

### Run the linter

```bash
npm run eslint:check
```

Note: The linter will return a non-zero exit code if there are any linting errors or warnings.

You can also try to automatically fix some of the errors and warnings by running:

```bash
npm run eslint:fix
```

### Run the formatter

```bash
npm run prettier:check
```

Formatting errors can be automatically fixed by running:

```bash
npm run prettier:fix
```
