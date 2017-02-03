
import tar2zip from 'tar-to-zip';
import tarStream from 'tar-stream';
import gunzipMaybe from 'gunzip-maybe';
import { Readable } from 'stream';
import fs from 'fs';

export default function package2zip(pack) {
    return new Promise((resolve, reject) => {
        checkForDist(pack, (error, hasDist) => {
            if (error) {
                return reject(error);
            }
            
            const stream = tar2zip(pack, {
                filter: hasDist ? distFilter : packageFilter,
                map: hasDist ? distMap : packageMap
            })
            .on('error', reject)
            .getStream();
            
            resolve(stream);
        });
        
    });
}


function distFilter({ name }) {
    return name.substr(0, 13) === 'package/dist/';
}

function distMap({ name }) {
    return {
        name: name.substr(13)
    };
}


function packageFilter({ name }) {
    return name.substr(0, 8) === 'package/';
}

function packageMap({ name }) {
    return {
        name: name.substr(8)
    };
}


function checkForDist(pack, callback) {
    const tar = tarStream.extract();
    
    tar.on('entry', (header, stream, next) => {
        if (header.name.substr(0, 13) === 'package/dist/') {
            return callback(null, true);
        }
        
        return next();
    });
    
    getFile(pack)
        .pipe(gunzipMaybe())
            .pipe(tar)
                .on('finish', () => callback(null, false))
                .on('error', (error) => callback(error));
    
    return true;
}


function getFile(file) {
    if (file instanceof Readable) {
        return file;
    }
    
    return fs.createReadStream(file);
}