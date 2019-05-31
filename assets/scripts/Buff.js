cc.Class({
    extends: cc.Component,

    properties: {
        time: {
            default: 100,
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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.des = this.node.getChildByName("desc").getComponent(cc.Label);
        this.tim = this.node.getChildByName("time").getComponent(cc.Label);
        //this.node.getChildByName("time").getComponent(cc.Label).string = " ";      
    },

    update(dt) {
        this.time -= 0.1;
        this.tim.string = this.Tostring(this.time);
        if(this.time <= 0){
            this.node.destory();
        }
    },

    Tostring(s) {
        let min = Math.floor(s / 60);
        let sec = Math.floor(s % 60);
        let str = min + ":" + sec;
        console.log(str);
        return str;
    }
});