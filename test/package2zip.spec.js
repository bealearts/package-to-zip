
import package2zip from '../';
import fs from 'fs';

describe('package2zip', () => {
    
    it('converts package', (done) => {
        package2zip('test/fixture/package.tgz')
            .then((stream) => {
                stream.pipe(fs.createWriteStream('test/fixture/package.zip'))
                    .on('finish', done);
            });
    });
    
});