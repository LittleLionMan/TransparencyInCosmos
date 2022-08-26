export const data = {
    juno: {
        name: "Juno",
        general: "some Info",
        specific: "some specific Info",
        validator: ["1", "2"],
        denom: "ujuno",
        cgId: "juno-network",
        loadVals: "https://api.juno.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://api.juno.pupmos.network/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://api.juno.pupmos.network//cosmos/staking/v1beta1/validators/"
    },
    cosmoshub: {
        name: "Cosmos Hub",
        general: "some Info",
        specific: "some specific Info",
        validator: ["1", "2"],
        denom: "uatom",
        cgId: "cosmos",
        loadVals: "https://api.cosmoshub.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://api.cosmoshub.pupmos.network/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://api.cosmoshub.pupmos.network//cosmos/staking/v1beta1/validators/"
    }
}