/**
 * Created by zc on 2017/8/1.
 */
function getFileObject(path, fileName) {
    let file='../json'+path+'/'+fileName+'.json';
    return require(file);
}

exports.getObject=getFileObject;