module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "worker": true,
        "jest": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 } // Indent 'case' 2 spaces from 'switch'
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
