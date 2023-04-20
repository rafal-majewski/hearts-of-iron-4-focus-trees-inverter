# nodejs-app-template

This is a template for a Node.js TypeScript project.

The following following tools have been configured:

- [Vitest](https://www.npmjs.com/package/vitest) for unit testing
- [ESLint](https://www.npmjs.com/package/eslint) for linting
- [Prettier](https://www.npmjs.com/package/prettier) for code formatting
- [ts-node](https://www.npmjs.com/package/ts-node) for running TypeScript scripts
- [TypeScript](https://www.npmjs.com/package/typescript) for TypeScript support

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
npm run preview
```

To run with `NODE_ENV=production`:

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

## CI Pipeline

The CI pipeline is configured in the `.github/workflows/ci.yml` file.
It consists of the following jobs:

### ESLint check

```bash
npm run eslint:check
```

### Prettier check

```bash
npm run prettier:check
```

### Vitest check

```bash
npm run vitest:check
```

You can later download the coverage report as an artifact named `coverage_report`.

### npm audit check

```bash
npm run npm-audit:check
```

### TypeScript check

Check if the code compiles:

```bash
npm run typescript:check
```

### Compiling the application

This job requires all the previous formatting-unrelated jobs to pass.

```bash
npm run compile
```

You can later download the compiled code as an artifact named `dist`.
