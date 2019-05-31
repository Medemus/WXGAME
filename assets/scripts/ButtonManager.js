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
        BuyButton:{default:[],type:[cc.Node]},
    },
    onLoad(){
        this.mana = this.gamemanager.getComponent("GameManager");
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
    AddBuff(event,data) {
            this.gamemanager.getComponent("GameManager").AddBuff(data);
            this.BuyButton[parseInt(data)].getChildByName("Background").getChildByName("name").getComponent(cc.Label).string = this.mana.data.buffes[parseInt(data)].getComponent("Buff").money;
    },
    DeleteBuff() {
        if (this.u)
            this.gamemanager.getComponent("GameManager").DeleteBuff();
    },
    OpenStore() {
        this.u = false;
        for(var i = 0;i<this.BuyButton.length;i++){
            if(this.mana.data.buffes[i] != null){
                this.BuyButton[i].getChildByName("Background").getChildByName("name").getComponent(cc.Label).string = this.mana.data.buffes[i].getComponent("Buff").money;
            }
            else{
                
            }
        }
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