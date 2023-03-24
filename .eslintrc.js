module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "parser": "@babel/eslint-parser",
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
        "modules": true
    }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off"
    },
    "settings": {
        "react": {
          "version": "detect"
        }
      }
    }

