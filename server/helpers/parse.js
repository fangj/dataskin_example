function p2p(p) {
    return new Promise((resolve, reject) => {
        return p.then(resolve, reject);
    });
}
exports.p2p = p2p;
function toJSON(doc) {
    if (doc) {
        return doc.toJSON();
    }
    else {
        return null;
    }
}
exports.toJSON = toJSON;
function toJSONList(docs) {
    return docs.map(toJSON);
}
exports.toJSONList = toJSONList;