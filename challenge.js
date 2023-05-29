function generateRandomString(length) {
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function encryptAES(code, key, iv) {
    return CryptoJS.AES.encrypt(code, key, { iv: iv }).toString();
}

function xorEncrypt(code, key) {
    var encryptedCode = '';
    for (var i = 0; i < code.length; i++) {
        encryptedCode += String.fromCharCode(code.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedCode;
}

function encryptCode() {
    var code = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="challenge.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
    <title>Majmohar.me | Challenge</title>
    </head>
    <body>
    <main>
    <h1>Čestitamo, našel si kodo.</h1>
    <p>Koda: 12345678765432</p>
    </main>
    </body>
    </html>
    `;

    var aesKey = generateRandomString(32);
    var aesIV = generateRandomString(16);
    var xorKey = generateRandomString(16);

    var encryptedCode = encryptAES(code, aesKey, aesIV);
    var doubleEncryptedCode = xorEncrypt(encryptedCode, xorKey);

    var antiDebuggingCode = '(function() {';
    // Anti-debugging code
    if (typeof console !== 'undefined') {
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.debug = function() {};
        console.trace = function() {};
    }

    Object.defineProperty(window, 'onerror', {
        get: function() {
            return null;
        }
    });

    window.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
        }
    });

    window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    }, false);

    window.addEventListener('resize', function() {
        if (window.innerWidth !== screen.width || window.innerHeight !== screen.height) {
            var count = 0;
        while (count < 5) {
        alert('Debugger detected. Please close the debugger and refresh the page.');
        console.log("to ne smeš gledati")
        }
        }
    });

    antiDebuggingCode += '})();';

    var finalCode = doubleEncryptedCode + antiDebuggingCode;

    document.documentElement.innerHTML = `
            <h2>1. Challenge</h2>
            <hr>
            <h1>Poišči izvorno kodo</h1>
            <p>Poskušaj najti kodo, ki se začne na 12... in mi jo pošlji na DM.</p>
        `;
    }
    while (count < 5) {
            console.log("to ne smeš gledati")
            }
    
encryptCode();
