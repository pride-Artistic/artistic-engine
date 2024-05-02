// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.test.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  root: true,
  rules: {
    "prettier/prettier": [
      "error",
      { endOfLine: "auto" },
    ],
    "@typescript-eslint/member-ordering": [
      "error", 
      {
        default: { 
          memberTypes:[
            // Index signature
            "signature",
            "call-signature",
        
            // Fields
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "#private-static-field",
        
            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",
        
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "#private-instance-field",
        
            "public-abstract-field",
            "protected-abstract-field",
        
            "public-field",
            "protected-field",
            "private-field",
            "#private-field",
        
            "static-field",
            "instance-field",
            "abstract-field",
        
            "decorated-field",
        
            "field",
        
            // Static initialization
            "static-initialization",
        
            // Constructors
            "public-constructor",
            "protected-constructor",
            "private-constructor",
        
            "constructor",
        
            // Getters
            "public-static-get",
            "protected-static-get",
            "private-static-get",
            "#private-static-get",
        
            "public-decorated-get",
            "protected-decorated-get",
            "private-decorated-get",
        
            "public-instance-get",
            "protected-instance-get",
            "private-instance-get",
            "#private-instance-get",
        
            "public-abstract-get",
            "protected-abstract-get",
        
            "public-get",
            "protected-get",
            "private-get",
            "#private-get",
        
            "static-get",
            "instance-get",
            "abstract-get",
        
            "decorated-get",
        
            "get",
        
            // Setters
            "public-static-set",
            "protected-static-set",
            "private-static-set",
            "#private-static-set",
        
            "public-decorated-set",
            "protected-decorated-set",
            "private-decorated-set",
        
            "public-instance-set",
            "protected-instance-set",
            "private-instance-set",
            "#private-instance-set",
        
            "public-abstract-set",
            "protected-abstract-set",
        
            "public-set",
            "protected-set",
            "private-set",
            "#private-set",
        
            "static-set",
            "instance-set",
            "abstract-set",
        
            "decorated-set",
        
            "set",
        
            // Methods
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "#private-static-method",
        
            "public-decorated-method",
            "protected-decorated-method",
            "private-decorated-method",
        
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
            "#private-instance-method",
        
            "public-abstract-method",
            "protected-abstract-method",
        
            "public-method",
            "protected-method",
            "private-method",
            "#private-method",
        
            "static-method",
            "instance-method",
            "abstract-method",
        
            "decorated-method",
        
            "method"
          ],
        }
      }
    ],
    // "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "no-console": "off",
  },
};
