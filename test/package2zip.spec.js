
import package2zip from '../';
import fs from 'fs';

describe('package2zip', () => {
    
    it('converts package', (done) => {
        package2zip(fs.createReadStream('test/fixture/package.tgz'))
            .pipe(fs.createWriteStream('test/fixture/package.zip'))
            .on('finish', done);
    });
    
    it('converts package with dist folder', (done) => {
        package2zip(fs.createReadStream('test/fixture/package.tgz'), true)
            .pipe(fs.createWriteStream('test/fixture/dist.zip'))
            .on('finish', done);
    });
    
    
});