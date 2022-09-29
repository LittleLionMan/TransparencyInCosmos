export const data = {
    cosmoshub: {
        name: "Cosmos Hub",
        denom: "uatom",
        cgId: "cosmos",
        loadVals: "https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://cosmos.lcd.atomscan.com/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://cosmos.lcd.atomscan.com/cosmos/distribution/v1beta1/community_pool",
        loadProposals: "https://cosmos.lcd.atomscan.com/cosmos/gov/v1beta1/proposals",
        loadSlashes: "https://cosmos.lcd.atomscan.com/cosmos/distribution/v1beta1/validators/",
        loadSelfStake: "https://cosmos.lcd.atomscan.com/staking/delegators/",
        loadHeight: "https://cosmos-rpc.polkachu.com/abci_info?",
    },
    juno: {
        name: "Juno",
        denom: "ujuno",
        cgId: "juno-network",
        loadVals: "https://juno-api.lavenderfive.com:443/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://juno-api.lavenderfive.com:443/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://juno-api.lavenderfive.com:443/cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://juno-api.lavenderfive.com:443/cosmos/distribution/v1beta1/community_pool",
        loadProposals: "https://juno-api.lavenderfive.com:443/cosmos/gov/v1beta1/proposals",
        loadSlashes: "https://juno-api.lavenderfive.com:443/cosmos/distribution/v1beta1/validators/",
        loadSelfStake: "https://juno-api.lavenderfive.com:443/staking/delegators/",
        loadHeight: "https://juno-rpc.polkachu.com/abci_info?"
    },
}