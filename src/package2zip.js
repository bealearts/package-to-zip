
import tar2zip from 'tar-to-zip';

export default function package2zip(packStream, options) {
    
    const opts = { ...{
        distOnly: false
    }, ...options };
    
    return tar2zip(packStream, {
        filter: opts.distOnly ? distFilter : packageFilter,
        map: opts.distOnly ? distMap : packageMap
    })
        .getStream();
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