// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        //this.getComponent(cc.Label).string = "";
    },

    // update (dt) {},
    ini(str, parent) {
        this.getComponent(cc.Label).string = "+" + str;
        this.node.x = parent.x;
        this.node.y = parent.y;
        this.MoveTO(this.node, this.node.x + 100, this.node.y + 500, 2);

    },
    MoveTO(node, x, y, time) {
        let temp = cc.moveTo(time, cc.v2(x, y));
        node.runAction(temp);
    }
});