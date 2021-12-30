const {getTVL, getMaxAPR} = require('./calc.js');

async function main() {
    var tvl = await getTVL();
    console.log('tvl: ', tvl);

    var maxAPR = await getMaxAPR();
    console.log('apr: ', maxAPR);
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})