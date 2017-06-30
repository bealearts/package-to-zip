# package-to-zip

Convert an npm package tarball to a zip file

# Usage
```js
import fs from 'fs';
import package2zip from 'package-to-zip';

package2zip(fs.createReadStream('./package.tgz'), { distOnly: true })
    .pipe(fs.createWriteStream('./dist.zip'))
    .on('finish', console.log('Done!);
```


# Install
```shell
npm install package-to-zip --save
```


# Test
```shell
npm install
npm test
```