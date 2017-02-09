
import package2zip from '../';
import fs from 'fs';
import temp from 'temp';
import { expect } from 'chai';
import DecompressZip from 'decompress-zip';

temp.track();

describe('package2zip', () => {
    
    it('converts package', (done) => {
        const writeStream = temp.createWriteStream();
        
        package2zip(fs.createReadStream('test/fixture/package.tgz'))
            .pipe(writeStream)
            .on('finish', () => {
                const zip = new DecompressZip(writeStream.path);
                
                zip.on('error', done);
                
                zip.on('list', (files => {
                    expect(files).to.deep.equal(['package.json','dist/package2zip.js']);
                    done();
                }))
                
                zip.list();
            });
    });
    
    it('converts package with dist folder', (done) => {
        const writeStream = temp.createWriteStream();
        
        package2zip(fs.createReadStream('test/fixture/package.tgz'), { distOnly: true })
            .pipe(writeStream)
            .on('finish', () => {
                const zip = new DecompressZip(writeStream.path);
                
                zip.on('error', done);
                
                zip.on('list', (files => {
                    expect(files).to.deep.equal(['package2zip.js']);
                    done();
                }))
                
                zip.list();
            });
    });
    
    
});