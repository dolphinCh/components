/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {chain, Rule, noop, Tree} from '@angular-devkit/schematics';
import {Schema} from './schema';
import {addModuleImportToModule, findModuleFromOptions} from '../utils/ast';
import {buildComponent} from '../utils/devkit-utils/component';

/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({...options}),
    options.skipImport ? noop() : addTableModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addTableModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options);
    addModuleImportToModule(host, modulePath, 'MatTableModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'MatPaginatorModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'MatSortModule', '@angular/material');
    return host;
  };
}
