module.exports = {
  ethereum: {
    rpcUrl: 'https://mainnet.infura.io/cbRDKUhDmEWYWrQEdOLS',
    rpcTimeout: 10000,
    ckCoreAddress: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    ckSaleAuctionAddress: '0xb1690c08e213a35ed9bab7b318de14420fb57d8c',
    ckSireAuctionAddress: '0xc7af99fe5513eb6710e6d5f44f9989da40f27f26',
    secondsPerBlock: 15,
    confimationBlocks: 15,
  },
  database: {
    filename: './app_data/ckdata.db',
  },
  logger: {
    level: 'debug',
    filename: './app_data/logs/ckwallet.log',
    logToConsole: true,
  },
  synchronization: {
    interval: 600000,
  },
  corsAllowOrigin: 'http://localhost:4200',
};

