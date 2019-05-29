var data = cc.Class({
    name: data,
    properties: {
        money: {
            default: 0,
            type: cc.Integer
        }, //金钱
        level: {
            default: 1,
            type: cc.Integer
        }, //等级
        buffes: {
            default: [],
            type: [Buff]
        }, //buff数组
        List: {
            default: [],
            type: [li]
        }, //订单数组
        //List = new Array(),
        speed: {
            default: 0.5,
            type: cc.Float
        },
    }
})

var li = cc.Class({
    name: li,
    properties: {
        num: {
            default: 0,
            type: cc.Float
        },
        Lastednum: {
            default: 0,
            type: cc.Float
        },
        name: {
            default: "null",
            type: cc.String
        },
        ListType: {
            default: null,
            type: ListKind
        },
    }
})

var Buff = cc.Class({
    name: Buff,
    properties: {
        time: {
            default: 0,
            type: cc.Float
        },
        name: {
            default: "unknowname",
            type: cc.String
        },
        kind: {
            default: null,
            type: BuffKind
        },
        icon: {
            default: null,
            type: cc.Node
        },
    }
})


var ListKind = {
    "Normal": 0,
    "Star": 1,
    "Event": 2
} //订单种类
var BuffKind = {

} //buff种类
cc.Class({
    extends: cc.Component,

    properties: {
        data: {
            default: null,
            type: data
        },
        ListonDoing: {
            default: null,
            type: li
        },
        ListShow: {
            default: null,
            type: cc.Node
        },
        la: {
            default: null,
            type: cc.Label
        },
        Move: {
            default: null,
            type: cc.Node
        },
        Showed: false,

        kind: ListKind.Star,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    },

    start() {

    },

    update(dt) {
        this.Doing();
    },

    Doing() {
        
            if (this.ListonDoing == null) {
                this.Refrsh();
            } else if(this.Showed){
                this.ListonDoing.Lastednum += 1;
                var bili = this.ListonDoing.Lastednum / this.ListonDoing.num;
                var sheng = this.ListonDoing.num - this.ListonDoing.Lastednum;
                this.ListShow.getChildByName("list_back").getComponent(cc.Sprite).fillStart = bili;
                this.ListShow.getChildByName("nes").getComponent(cc.Label).string = "需要 X"+sheng;
                if (this.ListonDoing.Lastednum >= this.ListonDoing.num) {
                    this.Refrsh();
                }
            }
        
        
    },

    Click() {
        if (this.ListonDoing != null&&this.Showed) {
            this.ListonDoing.Lastednum += 50;

        }

    },
    Refrsh(ds) {
        this.Showed = false;
        this.ListShow.active = false;
        this.Move.getComponent("Move").Move();
        this.NewList();
        this.scheduleOnce(function () {
            this.Showed = true;
            this.ListShow.active = true;
        }, 0.9)
    },
    AddMoney(num) {
        this.data.money += num;
        this.money.string = this.data.money;
    },
    AddLV(num) {
        this.data.level += num;
        this.level.string = this.data.level;
    },
    NewList() {

        var temp = new li();
        temp.num = 100;
        temp.Lastednum = 0;
        temp.name = "s";
        temp.ListType = this.kind;
        this.ListonDoing = temp;
        this.ListShow.getChildByName("name").getComponent(cc.Label).string = this.ListonDoing.name;
        this.ListShow.getChildByName("list_back").getComponent(cc.Sprite).fillStart = 0;
        this.ListShow.getChildByName("nes").getComponent(cc.Label).string = "需要:'''X" + this.ListonDoing.num-this.ListonDoing.Lastednum;
    },
    ChangeKind(num) {

        switch (num) {
            case "0":
                this.kind = ListKind.Normal;
                this.la.string = ListKind.Normal;
                break;
            case "1":
                this.kind = ListKind.Star;
                this.la.string = ListKind.Star;
                break;
            case "2":
                this.kind = ListKind.Event;
                this.la.string = ListKind.Event;
                break;
            default:
                this.la.string = "break";
                break;
        }



    },
    AddBuff() {
        if (this.data.money >= 10) {
            var node = cc.instantiate(this.buffp);
            var bu = new Buff();
            bu.icon = node;
            this.data.buffes.push(bu);
            node.parent = this.BuffShow;
            this.AddMoney(-10);
        } else {
            this.LowMoney.active = true;
            this.scheduleOnce(function () {
                this.LowMoney.active = false;
            }, 2);
        }
    },
    DeleteBuff() {
        if (this.data.buffes.length > 0) {
            var bu = this.data.buffes.pop();
            bu.icon.destroy();
        }
    }
});