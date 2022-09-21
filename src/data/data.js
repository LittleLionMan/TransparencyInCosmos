export const data = {
    cosmoshub: {
        name: "Cosmos Hub",
        denom: "uatom",
        cgId: "cosmos",
        loadVals: "https://api.cosmoshub.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadValI: "https://api.cosmoshub.pupmos.network/distribution/validators/",
        loadBank: "https://api.cosmoshub.pupmos.network/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://api.cosmoshub.pupmos.network//cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://api.cosmoshub.pupmos.network/cosmos/distribution/v1beta1/community_pool",
        loadProposals: "https://api.cosmoshub.pupmos.network/cosmos/gov/v1beta1/proposals",
        loadSlashes: "https://api.cosmoshub.pupmos.network/cosmos/distribution/v1beta1/validators/",
        loadHeight: "https://cosmos-rpc.polkachu.com/abci_info?"
    },
    juno: {
        name: "Juno",
        denom: "ujuno",
        cgId: "juno-network",
        loadVals: "https://api.juno.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadValI: "https://api.juno.pupmos.network/distribution/validators/",
        loadBank: "https://api.juno.pupmos.network/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://api.juno.pupmos.network/cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://api.juno.pupmos.network/cosmos/distribution/v1beta1/community_pool",
        loadProposals: "https://api.juno.pupmos.network/cosmos/gov/v1beta1/proposals",
        loadSlashes: "https://api.juno.pupmos.network/cosmos/distribution/v1beta1/validators/",
        loadHeight: "https://juno-rpc.polkachu.com/abci_info?"
    },
}