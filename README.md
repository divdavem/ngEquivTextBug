This repository shows how to reproduce a bug in Angular i18n in the equiv-text attribute.

The first commit in this repository is created by running the following commands:

```sh
ng new mylib --no-create-application --skip-git

cd mylib
ng generate library mylib

cd ..
ng new myapp --skip-git
```

The second commit is created by following the remaining procedure:

Add the `i18n` attribute and a placeholder in `mylib.component.ts`:

```ts
  template: `
    <p i18n>
      Hello {{name}}!
    </p>
  `,
```

Build the library in prod mode:

```sh
cd mylib
ng build --prod
```

Then use the lib in `package.json` in `myapp`:

```json
{
    "dependencies": {
        ...
        "mylib": "file:../mylib/dist/mylib"
    }
}
```

Run the following commands:

```sh
cd myapp
npm install
ng add @angular/localize
```

Import the library in `app.module.ts`:

```ts
import { MylibModule } from 'mylib';
...
  imports: [
    BrowserModule,
    MylibModule
  ],
```

Use the library component in `app.component.html`:

```html
<lib-mylib></lib-mylib>
```

You can optionally check that the application works fine:

```sh
ng serve
# go to http://localhost:4200
```

Extract messages to be localized:

```sh
ng extract-i18n
```

The resulting [`messages.xlf`](./myapp/messages.xlf) file does not contain any `equiv-text` attribute for the interpolation and the line number `22` is wrong.

Also, when looking at the generated `mylib.js` and `mylib.js.map` files in `mylib/dist/mylib/__ivy_ngcc__/fesm2015` with [source-map-visualization](http://sokra.github.io/source-map-visualization), it is obvious that there is a problem with the source map.
