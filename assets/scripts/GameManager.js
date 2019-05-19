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
            type: [cc.Node]
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
        time: {
            default: 0,
            type: cc.Float
        },
        LastedTime: {
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
}//订单种类
var BuffKind = {

}//buff种类
cc.Class({
    extends: cc.Component,

    properties: {
        data: {
            default: null,
            type: data
        },
        ListonDoing: {
            default: [],
            type: [li]
        },
        ListShow: {
            default: [],
            type: [cc.Node]
        },
        la: {
            default: null,
            type: cc.Label
        },
        money: {
            default: null,
            type: cc.Label
        },
        level: {
            default: null,
            type: cc.Label
        },
        BuffShow:{default:null,type:cc.Node},
        buffp:cc.Prefab,
        kind: ListKind.Star,
        LowMoney:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.data = new data();
        this.kind = ListKind.Star;
        //this.NewList();
    },

    start() {
        this.kind = ListKind.Normal;
        this.NewList();
        this.kind = ListKind.Star;
        this.NewList();
        this.kind = ListKind.Event;
        this.NewList();
        this.kind = ListKind.Normal;
        //初始化三种订单表
        this.level.string = this.data.level;
    },

    update(dt) {
        this.Doing();
    },

    Doing() {
        this.la.string = this.kind;
        if (this.ListonDoing[this.kind] == null) {
            this.NewList();
        } else {
            this.ListonDoing[this.kind].time -= this.data.speed;
            var bili = this.ListonDoing[this.kind].time / this.ListonDoing[this.kind].LastedTime;
            this.ListShow[this.kind].getChildByName("progressBar").getComponent(cc.ProgressBar).progress = 1 - bili;

            if (this.ListonDoing[this.kind].time <= 0) {
                this.AddMoney(10);
                this.ListonDoing[this.kind] = null;
                ``
            }
        }


    },

    Click() {
        if (this.ListonDoing[this.kind] != null) {
            this.ListonDoing[this.kind].time -= 50;
        }

    },
    Refrsh(ds) {
        ds.getChildByName("name").getComponent(cc.Label).string = this.ListonDoing[this.kind].name;
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
        temp.time = 100;
        temp.LastedTime = 100;
        temp.name = "s";
        temp.ListType = this.kind;
        this.ListonDoing[this.kind] = temp;
        this.Refrsh(this.ListShow[this.kind])

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
    AddBuff(){
        if(this.data.money>=10){
        var node = cc.instantiate(this.buffp);
        this.data.buffes.push(node);
        node.parent = this.BuffShow;
        this.AddMoney(-10);
        }
        else{
            this.LowMoney.active = true;
            this.scheduleOnce(function(){ this.LowMoney.active = false; },2);
        }
    },
    DeleteBuff(){
        var node = this.data.buffes.pop();
        node.destroy();
    }
});