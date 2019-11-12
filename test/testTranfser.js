const TestToken = artifacts.require("TestToken.sol");
const MeTransferFrom = artifacts.require("MeTransferFrom.sol");


contract('TestTransfer', function(accounts) {
    it("transfer from and transfer back in one step.", async function () {
        let amount = 5000;
        let someGuy = accounts[1];

        let token = await TestToken.new("test", "TST", 18);

        let transferFrom = await MeTransferFrom.new();
        await token.transfer(someGuy, amount);

        let someGuyBal = await token.balanceOf(someGuy);
        console.log("before: some guy balance = " + someGuyBal);

        await token.approve(transferFrom.address, amount, {from: someGuy});

        await transferFrom.takeMyTokensAndGiveBack(token.address, amount, {from: someGuy});

        someGuyBal = await token.balanceOf(someGuy);
        console.log("after: some guy balance = " + someGuyBal);
    });

    it("transfer from small balance account to another 0 account", async function () {
        let amount = 5000;
        let someGuy = accounts[6];
        let anotherGuy = accounts[7];

        let token = await TestToken.new("test", "TST", 18);

        await token.transfer(someGuy, amount);

        await token.transfer(anotherGuy, amount, {from: someGuy});
    });

    it("transfer from and give back in two steps.", async function () {
        let amount = 5000;
        let someGuy = accounts[1];

        let token = await TestToken.new("test", "TST", 18);
        let transferFrom = await MeTransferFrom.new();

        await token.transfer(someGuy, amount);

        let someGuyBal = await token.balanceOf(someGuy);
        console.log("before: some guy balance = " + someGuyBal);

        await token.approve(transferFrom.address, amount, {from: someGuy});
        await transferFrom.onlyTakeMyTokens(token.address, amount, {from: someGuy});
        await transferFrom.askGiveBack(token.address, amount, {from: someGuy});

        someGuyBal = await token.balanceOf(someGuy);
        console.log("after: some guy balance = " + someGuyBal);
    });

});

function log (str) {
    console.log(str)
}