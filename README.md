## npm-create-node

Quickly create a npm package for node, within TypeScript. 

Inspired by [npm-create](https://github.com/jhermsmeier/npm-create). If you just want to create a normal npm package, please use it.

### Installation & Usage

```
  npm install npm-create-node
  // yarn add npm-create-node
```

#### API

```
  pkgGenerator.createPkg('example', process.cwd()).then((res) => {
    if (res.success) {
      //...
    }
  });
```

#### CLI

```
  npm install npm-create-node -g
  npm-create-node example --path ${target_path}
```