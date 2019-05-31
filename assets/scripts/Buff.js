cc.Class({
    extends: cc.Component,

    properties: {
        Lv: {
            default: 0,
            type: cc.Integer
        },
        describ: {
            default: "null",
            type: cc.String
        },
        addnum: {
            default: 0,
            type: cc.Integer
        },
        auto: {
            default: false,
            type: cc.Boolean
        },
        autonum: {
            default: 0,
            type: cc.Integer
        },
        money: {
            default: 100,
            type: cc.Integer
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.des = this.node.getChildByName("desc").getComponent(cc.Label);
        this.llv = this.node.getChildByName("level").getComponent(cc.Label);
        //this.node.getChildByName("time").getComponent(cc.Label).string = " ";  
        this.des.string = this.describ;   
        this.llv.string = this.Lv; 
    },

    update(dt) {
        
    },
    Upgrade(){
        this.Lv += 1
        this.addnum = Math.floor(0.8*this.Lv*this.addnum);
        this.autonum = Math.floor(this.Lv*this.autonum);
        this.money = Math.floor(this.Lv*this.money);
        this.llv.string = this.Lv;
    }
});