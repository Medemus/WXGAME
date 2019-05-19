cc.Class({
    extends: cc.Component,

    properties: {
        gamemanager: {
            default: null,
            type: cc.Node
        },
        t: {
            default: null,
            type: cc.Label
        },
        Store: {
            default: null,
            type: cc.Node
        },
    },

    Doing(event, data) {
        this.gamemanager.getComponent("GameManager").Click();
        //this.t.string = data;
    },

    ChangeKind(event, data) {
        this.gamemanager.getComponent("GameManager").ChangeKind(data);
    },
    AddBuff() {
        this.gamemanager.getComponent("GameManager").AddBuff();
    },
    DeleteBuff() {
        this.gamemanager.getComponent("GameManager").DeleteBuff();
    },
    OpenStore() {
        this.Store.active = true;
    },
    CloseStore() {
        this.Store.active = false;
    },
});