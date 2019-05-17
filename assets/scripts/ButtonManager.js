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
        lll: {
            default: null,
            type: cc.Node
        },
    },

    Doing(event, data) {
        this.gamemanager.getComponent("GameManager").Click();
        //this.t.string = data;
    },

    ChangeKind(event,data){
        this.gamemanager.getComponent("GameManager").ChangeKind(data);
    }
});