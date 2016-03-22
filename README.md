## Surge Conf

> Surge config generator for EurekaVPT SSLedge Pro User

## Start

Make sure you have [EurekaVPT](https://eurekavpt.com) SSLedge + Cisco VPN (Pro) Service.

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
