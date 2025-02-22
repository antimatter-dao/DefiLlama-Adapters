const { staking } = require('../helper/staking')
const { sumTokens } = require('../helper/unwrapLPs')

const v1_0_Pools = ['0x7Af4e1cE484f40D927b9C90fB6905Df4376fc3F6', '0xd7d974E81382D05E8D9fc6d0d17d0d852e9806dd']
const v1_1_LiquidityPool = [
    '0x2935CD347B79C319A6464fe3b1087170f142418C', 
    '0x69B4B35504a8c1d6179fef7AdDCDB37A8c663BC9', 
    '0x788843DE0Be1598155bFFaAB7Cfa2eCBd542E7f1'
]
const v1_1_ShortCollateral = [
    '0xE722F9aee66F649FBfc8CB0d4F906cb55803553c', 
    '0x585a72ccecde68dDFE5327B23134723a305D70F3', 
    '0x0A68E15f8E289b9f1Ad1BCAD524FeA30C6125c2D'
]

const v1_2_LiquidityPool = [
    '0x5Db73886c4730dBF3C562ebf8044E19E8C93843e',
    '0x3C73CD65D708A5C951f0Cc19a4D0Bb6559ae20c5',
    '0xA33C1963d74d203DF6bFfDfDa3bFf39a1D76e1D0'
    ]

const v1_2_ShortCollateral = [
    '0x3E86B53e1D7DA7eDbA225c3A218d0b5a7544fDfD',
    '0x26cf967e466d9fd60af7d1b78a01c43e75e03b32',
    '0xa5ce396616c7D14F61B5B9bbA3A57388Db885b2E'
    ]

const v1_3_arb_ShortCollateral = [
    '0xef4a92fcde48c84ef2b5c4a141a4cd1988fc73a9',
    ]
const v1_3_arb_LiquidityPool = [
    '0xb619913921356904bf62aba7271e694fd95aa10d',
    ]

const op_pools = [...new Set([...v1_0_Pools, ...v1_1_LiquidityPool, ...v1_1_ShortCollateral, ...v1_2_LiquidityPool, ...v1_2_ShortCollateral].map(t=>t.toLowerCase()))]

const arb_pools = [...new Set([...v1_3_arb_ShortCollateral, ...v1_3_arb_LiquidityPool].map(t=>t.toLowerCase()))]

const op_tokens = ['0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9', '0xe405de8f52ba7559f9df3c368500b6e6ae6cee49',
    '0xc5db22719a06418028a40a9b5e9a7c02959d0d08', '0x298b9b95708152ff6968aafd889c6586e9169f1d']

const arb_tokens = ['0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f']

const L2toL1Synths = {
    '0xe405de8f52ba7559f9df3c368500b6e6ae6cee49': '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    '0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9': '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    '0x298b9b95708152ff6968aafd889c6586e9169f1d': '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    '0xc5db22719a06418028a40a9b5e9a7c02959d0d08': '0xbbc455cb4f1b9e4bfc4b73970d360c8f032efee6'
}

async function tvlOptimism(ttimestamp, _b, {optimism: block}){
    const balances = {}
    const transform = (addr)=>{
        return L2toL1Synths[addr] || addr;
    }
    await sumTokens(balances, op_tokens.map(t=>op_pools.map(p=>[t,p])).flat(), block, 'optimism', transform)
    return balances
}

async function tvlArbitrum(ttimestamp, _b, {arbitrum: block}){
    const balances = {}
    await sumTokens(balances, arb_tokens.map(t=>arb_pools.map(p=>[t,p])).flat(), block, 'arbitrum')
    return balances
}

module.exports = {
    methodology: 'TVL counts the option market locked synth value, along with USDC in safety module.',
    optimism:{
        tvl:tvlOptimism
    },
    arbitrum:{
        tvl:tvlArbitrum
    },
    ethereum:{
        tvl: staking("0x54d59c4596c7ea66fd62188ba1e16db39e6f5472", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "ethereum"),
        staking: staking("0xcb9f85730f57732fc899fb158164b9ed60c77d49", "0x01ba67aac7f75f647d94220cc98fb30fcc5105bf", "ethereum")
    },
 hallmarks:[
    [1635218174, "Lyra Token"],
    [1635822974, "Token Program Start"],
    [1655341200, "Lyra V1.1 End"],
    [1656291600, "Lyra Avalon Start"],
    [1659560056, "OP Rewards Distribution Start"],
    [1675080000, "Launch on Arbitrum"]
  ]
}
