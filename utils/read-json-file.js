/**
 * Created by zc on 2017/8/1.
 */
function getFileObject(path, fileName) {
    return require('../json'+path+'/'+fileName+'.json');
}

exports.getObject=getFileObject;