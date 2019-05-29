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
        u: {
            default: true,
            type: cc.Boolean
        },
        move:cc.Node,
    },

    Doing(event, data) {
        if (this.u)
            this.gamemanager.getComponent("GameManager").Click();
        //this.t.string = data;
    },

    ChangeKind(event, data) {
        if (this.u)
            this.gamemanager.getComponent("GameManager").ChangeKind(data);
    },
    AddBuff() {
            this.gamemanager.getComponent("GameManager").AddBuff();
    },
    DeleteBuff() {
        if (this.u)
            this.gamemanager.getComponent("GameManager").DeleteBuff();
    },
    OpenStore() {
        this.u = false;
        this.Store.active = true;
    },
    CloseStore() {
        this.u = true;
        this.Store.active = false;
    },
    Move(){
        this.move.getComponent("Move").Move();
    }
});