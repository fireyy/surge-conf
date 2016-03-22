## Surge Conf

> Surge Config builder for EurekaVPT SSLedge Pro

## Start

```shell
cp config-sample.js config.js
```

Use your favorite text editor to open and edit file `config.js`, set your EurekaVPT SSLedge Pro Service Username and Password.

```javascript
module.exports = {
  username: 'test',
  password: '123qweasd'
};
```

## Run

```shell
node index
```

This command will generate `surge.conf`.
