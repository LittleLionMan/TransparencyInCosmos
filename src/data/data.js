export const data = {
    cosmoshub: {
        name: "Cosmos Hub",
        denom: "uatom",
        cgId: "cosmos",
        loadVals: "https://rest.cosmos.directory/cosmoshub/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://rest.cosmos.directory/cosmoshub/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://rest.cosmos.directory/cosmoshub/cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://rest.cosmos.directory/cosmoshub/cosmos/distribution/v1beta1/community_pool",
        loadProposals: "https://rest.cosmos.directory/cosmoshub/cosmos/gov/v1beta1/proposals",
        loadSlashes: "https://rest.cosmos.directory/cosmoshub/cosmos/distribution/v1beta1/validators/",
        loadSelfStake: "https://rest.cosmos.directory/cosmoshub/staking/delegators/",
        loadHeight: "https://cosmos-rpc.polkachu.com/abci_info?",
        loadVotes: 'https://cosmos.lcd.atomscan.com/cosmos/tx/v1beta1/txs?pagination.offset=0&pagination.limit=100&orderBy=ORDER_BY_DESC&events=message.action=%27/cosmos.gov.v1beta1.MsgVote%27&events=message.sender=%27',
        loadAuthz: 'https://cosmos.lcd.atomscan.com/cosmos/tx/v1beta1/txs?pagination.offset=0&orderBy=ORDER_BY_DESC&events=message.action=%27/cosmos.authz.v1beta1.MsgExec%27&pagination.limit=100&events=message.sender=%27',
    },
    juno: {
        name: "Juno",
        denom: "ujuno",
        cgId: "juno-network",
        loadVals: "https://rest.cosmos.directory/juno/cosmos/staking/v1beta1/validators?&pagination.limit=500",
        loadBank: "https://rest.cosmos.directory/juno/cosmos/bank/v1beta1/supply/",
        loadDelegations: "https://rest.cosmos.directory/juno/cosmos/staking/v1beta1/validators/",
        loadCommunityPool: "https://rest.cosmos.directory/juno/cosmos/distribution/v1beta1/community_pool",
        loadProposals: "https://rest.cosmos.directory/juno/cosmos/gov/v1beta1/proposals",
        loadSlashes: "https://rest.cosmos.directory/juno/cosmos/distribution/v1beta1/validators/",
        loadSelfStake: "https://rest.cosmos.directory/juno/staking/delegators/",
        loadHeight: "https://juno-rpc.polkachu.com/abci_info?",
        loadVotes: 'https://juno-api.lavenderfive.com:443/cosmos/tx/v1beta1/txs?pagination.offset=0&pagination.limit=100&orderBy=ORDER_BY_DESC&events=message.action=%27/cosmos.gov.v1beta1.MsgVote%27&events=message.sender=%27',
        loadAuthz: 'https://juno-api.lavenderfive.com:443/cosmos/tx/v1beta1/txs?pagination.offset=0&orderBy=ORDER_BY_DESC&events=message.action=%27/cosmos.authz.v1beta1.MsgExec%27&pagination.limit=100&events=message.sender=%27',
    },
}