const StarNetwork = artifacts.require('StarNetwork');

describe('StarNetwork', () => {
    let accounts;
    let genesisAccount;
    let instance;
    let user1;
    let user2;
    let starId = 1;
    let starName = () => `TestStar-${starId}`;
    let starPrice = web3.utils.toWei('0.1', 'ether');
    let value = web3.utils.toWei('1', 'ether');
    let name = 'StarNetwork';
    let symbol = 'STARN';

    const loadContract = () => {
        contract('StarNetwork', accs => {
            accounts = accs;
            genesisAccount = accounts[0];
            user1 = accounts[1];
            user2 = accounts[2];
        });
    };

    beforeEach(async () => {
        loadContract();
        instance = await StarNetwork.deployed();
    });

    afterEach(() => {
        accounts = undefined;
        genesisAccount = undefined;
        user1 = undefined;
        user2 = undefined;
        instance = undefined;
        starId = starId + 1;
    });

    it('should create a star', async () => {
        await instance.createStar(starName(), {from: genesisAccount});
        const testStar = await instance.tokenId_StarInfo(starId);
        assert.equal(testStar, starName());
    });

    it('should allow owner (user1) to sell token owned by owner (user1)', async () => {
        await instance.createStar(starName(), {from: user1});
        await instance.listStarForBarter(starId, starPrice, {from: user1});
        const testPrice = await instance.tokenId_Price(starId);
        assert.equal(testPrice, starPrice);
    });

    it('should not allow non-owner (user2) to sell token owned by owner (user1)', async () => {
        await instance.createStar(starName(), {from: user1});
        try {
            await instance.listStarForBarter(starId, starPrice, {from: user2});
            throw new Error('User 2 was able to list token owned by User 1');
        } catch(error) {
            const message = 'Returned error: VM Exception while processing transaction: revert Error: Only the owner of this star can list it for sale. -- Reason given: Error: Only the owner of this star can list it for sale..'
            assert.equal(error.message, message);
        }
    });

    it('should send the funds to owner (user1) after the sale of a star to new owner (user2)', async () => {
        await instance.createStar(starName(), {from: user1});
        await instance.listStarForBarter(starId, starPrice, {from: user1});
        const balance_pre_transaction_user1 = await web3.eth.getBalance(user1);
        await instance.buyStar(starId, {from: user2, value}); 
        const balance_post_transaction_user1 = await web3.eth.getBalance(user1);
        const value1 = Number(balance_pre_transaction_user1) + Number(starPrice);
        const value2 = Number(balance_post_transaction_user1);
        assert.equal(value1, value2);
    });

    it('should allow non-owner (user2) to buy token owned by owner (user1) if token is for sale', async () => {
        await instance.createStar(starName(), {from: user1});
        await instance.listStarForBarter(starId, starPrice, {from: user1});
        await instance.buyStar(starId, {from: user2, value});
        const newOwner = await instance.ownerOf(starId);
        assert.equal(user2, newOwner);
    });

    it('should not allow non-owner (user2) to buy token owned by owner (user1) if token is not for sale', async () => {
        await instance.createStar(starName(), {from: user1});
        try {
            await instance.buyStar(starId, {from: user2, value});
            throw new Error('User 2 was able to buy token owned by User 1 that was not for sale.');
        } catch(error) {
            const message = 'Returned error: VM Exception while processing transaction: revert Error: This star is not for sale or trade. -- Reason given: Error: This star is not for sale or trade..';
            assert.equal(error.message, message);
        }
    });

    it('should decrease the balance of new owner (user2) on sale of token by old owner (user1)', async () => {
        await instance.createStar(starName(), {from: user1});
        await instance.listStarForBarter(starId, starPrice, {from: user1});
        const balance_pre_transaction_user2 = await web3.eth.getBalance(user2);
        const transaction = await instance.buyStar(starId, {from: user2, value});
        const hash = transaction.tx;
        const tx = await web3.eth.getTransaction(hash);
        const receipt = await web3.eth.getTransactionReceipt(hash);
        const balance_post_transaction_user2 = await web3.eth.getBalance(user2);
        assert.equal(
            web3.utils.fromWei(balance_post_transaction_user2),
            web3.utils.fromWei((balance_pre_transaction_user2 - starPrice - (tx.gasPrice * receipt.gasUsed)).toString())
        );
    });

    it('should exchange stars between two users', async () => {
        
    });

    it('should allow a user to transfer a star', async () => {

    });

    it('should be able to lookup a star', async () => {
        const {name} = await instance.lookupStar(1);
        const {name: name2} = await instance.lookupStar(2);
        assert.equal(name, 'TestStar-1');
        assert.equal(name2, 'TestStar-2');
    });

    it('should have the correct symbol and name', async () => {
        const token = await StarNetwork.new({from: user1});
        const tokenName = await token.name();
        const tokenSymbol = await token.symbol();
        assert.equal(tokenName, name);
        assert.equal(tokenSymbol, symbol);
    });
});
