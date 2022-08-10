var credential = require('credential'),
pw = credential();

module.exports = {
    hashPassword: oldPassword => {
        return new Promise((resolve, reject) => {
            pw.hash(oldPassword, function(err, hash) {
            if (err) reject(err)
                resolve(JSON.parse(hash).hash)
            });
        })
    }
}