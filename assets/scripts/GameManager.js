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

var ListKind = {
    "Normal": 0,
    "Star": 1,
    "Event": 2
}

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
        kind: ListKind.Star,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.data = new data();

        this.NewList();
    },

    start() {
        //this.List_01.string  = "s";
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
            this.ListShow[this.kind].getChildByName("progressBar").getComponent(cc.ProgressBar).progress = bili;
        }

        if (this.ListonDoing[this.kind].time <= 0) {
            this.ListonDoing[this.kind] = null;
            this.NewList();
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

       

    }
});