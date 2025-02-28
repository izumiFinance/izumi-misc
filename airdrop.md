# Airdrop

### clone and build


```
$ git clone git@github.com:izumiFinance/izumi-misc.git
$ cd izumi-misc
$ npm install
```

.secret.js

```
$ touch .secret.js
```

write following content.

```
module.exports = {
    pk: '${private key}', // no leading '0x'
    apiKey: '${api key of scan}',
}
```

compile:

```
$ npx hardhat compile
```

### deploy Airdrop

assume we are deploying on `bscTest`.

```
$ HARDHAT_NETWORK=bscTest node scripts/airdrop/deployAirdrop.js 0xe90ebA9b7f3fC6a0B1aE28FfF4932cb9E35B6946
```

here, `0xe90ebA9b7f3fC6a0B1aE28FfF4932cb9E35B6946` is admin address.

this script will deploy airdrop contract and then transfer ownership to admin address.
