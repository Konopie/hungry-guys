var credential = require('credential'),
pw = credential();

module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    },

    format_plural: (word, amount) => {
        if(amount !== 1){
            return `${word}s`
        }else{
            return word;
        }
    },

    format_url: (url) => {
        return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    }, 
     
    hashPassword: oldPassword => {
        return new Promise((resolve, reject) => {
            pw.hash(oldPassword, function(err, hash) {
            if (err) reject(err)
                resolve(hash)
            });
        })
    },

    checkPassword: (input, hash) => {
        return new Promise((resolve, reject) => {
            pw.verify(hash, input, function(err, isValid){
                var msg;
                if (err) { throw err; }
                msg = isValid ? 'Passwords match!' : 'Wrong password.';
                if(msg === 'Passwords match!'){
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        })
    }
}