export const data = {
    juno: {
        name: "Juno",
        specific: "some specific Info",
        validator: ["1", "2"],
        denom: "ujuno",
        cgId: "juno-network",
        loadVals: "https://api.juno.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://api.juno.pupmos.network/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://api.juno.pupmos.network//cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://api.juno.pupmos.network/cosmos/distribution/v1beta1/community_pool"
    },
    cosmoshub: {
        name: "Cosmos Hub",
        specific: "some specific Info",
        validator: ["1", "2"],
        denom: "uatom",
        cgId: "cosmos",
        loadVals: "https://api.cosmoshub.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://api.cosmoshub.pupmos.network/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://api.cosmoshub.pupmos.network//cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://api.cosmoshub.pupmos.network/cosmos/distribution/v1beta1/community_pool"
    }
}