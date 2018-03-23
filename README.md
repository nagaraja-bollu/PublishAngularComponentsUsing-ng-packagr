## publish Angular Components to NPM as package using ng-packagr

### prerequisites:
- Angular-cli template
-  ng-packagr

### Create Angular application using angular/cli

Run below commands for create a angular template
```sh
$ ng new project-name
$ cd project-name
```
Now Angular application is ready to use..

### Create folder as export to keep all the components, modules to export to package

Create a export module in export folder
```
ng g module export
```

Create a new component as emi under export folder
```
ng g component export/emi
```

Export emi component in export.module
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmiComponent } from './emi/emi.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmiComponent],
  exports: [EmiComponent]
})
export class ExportModule { }
```

### Import Export module in App.module

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExportModule } from './export/export.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExportModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Add below code to invoke Emi component in app.component.html for testing.
```
<app-emi>Test</app-emi>
```

Run the application 

```
ng server -o
```

Now you can see below text in browser

```
emi works!
Test
```

Now, its time to export the components to npm package using ng-packagr.

## Configuration of ng-packagr package.
### Feature of [ng-packagr](https://www.npmjs.com/package/ng-packagr#features)
### Install [ng-packagr](https://www.npmjs.com/package/ng-packagr) package

```
$ npm install ng-packagr --save
```

### Export modules, view-models etc in public_api.ts file to use in the client app
Create a file name as public_api.ts for exporting the modules.

```
export * from './src/app/export/export.module';
```

### Configure ng-package.json
Create a file with name as ng-package.json for picking the library entry file
[Reference](https://www.npmjs.com/package/ng-packagr#configuration-locations)
```
{
    "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
    "lib": {
      "entryFile": "public_api.ts"
    }
  }
```


### Add Script to Package.json for package creation

Change private property to false in package.json for publishing.
```
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "packagr": "ng-packagr -p ng-package.json"
  },
  "private": false
```

### Create the package files

```
$ npm run packagr
```
Package files will create to dist folder with below lines in command prompt.

```
Building Angular Package
Building entry point 'ngcliprojectpublish'
Cleaning build directory
Rendering Stylesheets
Rendering Templates
Compiling TypeScript sources through ngc
Bundling to FESM15
Bundling to FESM5
Bundling to UMD
Minifying UMD bundle
Relocating source maps
Copying staged files
Writing package metadata
Built ngcliprojectpublish
Built Angular Package!
- from: source-location-path
- to:   source-location-path\dist
```

Now its time to publish the package to NPM.
### Publish the pakcage to NPM
Login to NPM
```
npm login
Username: *****
Password: *****
Email: (This Is public) yourEmailAddress
Logged in as yourUsername on https://registry.npmjs.org/.
```

Publish the package
```
npm publish
```
Now you have successfully publish the package to NPM.

## How to use the published npm package in client applciation

#### create an angular client project using angular-cli as steps mentioned in above.
Install the published package to the client applition
```
$ npm install yourpackageName --save
```

Import the Export module to the App.module.ts in client application

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ExportModule } from 'ngcliprojectpublish';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    ExportModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Add below code to invoke Emi component from npm package to app.component.html in client application.
```
<app-emi>Test</app-emi>
```

Run the application 

```
ng server -o
```

Now you can see below text in browser

```
emi works!
Test
```

Now you are successfully reused the component from the published npm package


### Publish the package to private repository
 
- Create a .npmrc file in Users directory and add private repository token to it.
- Create another .npmrc file(with the registry information of private repository) to the package project and also add the same to dist folder.
 - Publish the package. Through .npmrc file, NPM will check that you are authorized user for publishin the package to the private repository.
_ No need to login to the registry of private repository.
  ```
  $ npm publish
  ```
- Now you have successfully published the npm package to private repository.

#### How to use the npm package from private repository.
- Create a .npmrc file(with the registry information of private repository) to the client project.
```
 $ npm install yourpackageName --save
```
- The package will install from the private reposiry.
