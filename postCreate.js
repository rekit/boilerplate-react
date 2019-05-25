'use strict';

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const prjPath = __dirname;

function postCreate(args) {
    // Remove unnecessary files
    ['.travis.yml', 'yarn.lock', 'diff.txt', 'LICENSE', 'package-lock.json']
        .map(f => path.join(prjPath, f))
        .forEach(file => fs.existsSync(file) && fs.unlinkSync(file));
    const name = _.kebabCase(args.name);

    // Clean package.json
    const pkgJsonPath = path.join(prjPath, 'package.json');
    const pkgJson = require(pkgJsonPath); // eslint-disable-line

    pkgJson.name = name;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, '  '));
}

module.exports = postCreate;
