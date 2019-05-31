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
            default: 0.1,
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
        Money: {
            default: 0,
            type: cc.Integer
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
        LvShow: {
            default: null,
            type: cc.Layout
        },

        Move: {
            default: null,
            type: cc.Node
        },
        money: {
            default: null,
            type: cc.Node
        },
        inf: {
            default: null,
            type: cc.Prefab
        },
        button: {
            default: null,
            type: cc.Node
        },
        ClickNum: {
            default: 1,
            type: cc.Integer
        },
        Showed: false,
        star: cc.Prefab,
        kind: ListKind.Star,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.data = new data();
        this.list_back = this.ListShow.getChildByName("list_back").getComponent(cc.Sprite);
        this.nes = this.ListShow.getChildByName("nes").getComponent(cc.Label);
    },

    start() {
        this.clickInformPool = new cc.NodePool();
        this.money.getChildByName("num").getComponent(cc.Label).string = "";
    },

    update(dt) {
        
            this.Doing();
        
        
    },

    Doing() {

        if (this.ListonDoing == null) {
            this.Refrsh();
        } else if (this.Showed) {
            this.ListonDoing.Lastednum += this.data.speed;
            
            var bili = this.ListonDoing.Lastednum / this.ListonDoing.num;
            var sheng = Math.floor( this.ListonDoing.num - this.ListonDoing.Lastednum);
            this.list_back.fillStart = bili;
            this.nes.string = "需要 X" + sheng;
            if (this.ListonDoing.Lastednum >= this.ListonDoing.num) {
                this.AddMoney(this.ListonDoing.Money);
                this.AddLV(1);
                this.Refrsh();
            }
        }


    },

    Click() {
        if (this.ListonDoing != null && this.Showed) {
            this.ListonDoing.Lastednum += this.ClickNum;
            this.creatInform(this.ClickNum, this.button);
        }

    },
    Refrsh(ds) {
        this.Showed = false;
        this.ListShow.active = false;
        this.Move.getComponent("Move").Move();
        this.NewList();
        this.scheduleOnce(function () {
            this.Showed = true;
            this.ListShow.getChildByName("name").getComponent(cc.Label).string = this.ListonDoing.name;
            this.ListShow.active = true;
        }, 0.9)
    },
    AddMoney(num) {
        this.data.money += num;
        this.money.getChildByName("num").getComponent(cc.Label).string = this.data.money;
        this.creatInform(num, this.money);
    },
    AddLV(num) {
        this.data.level += num;
        let node = cc.instantiate(this.star);
        node.parent = this.LvShow.node;
    },
    NewList() {

        var temp = new li();
        this.readList(temp);
        /*
                temp.num = 100;
                temp.Lastednum = 0;
                temp.name = "s";
                temp.ListType = this.kind;
                */
        
        this.ListonDoing = temp;
        //console.log(this.ListonDoing);
        //this.ListShow.getChildByName("name").getComponent(cc.Label).string = this.ListonDoing.name;
        this.ListShow.getChildByName("list_back").getComponent(cc.Sprite).fillStart = 0;
        this.ListShow.getChildByName("nes").getComponent(cc.Label).string = "需要:'''X" + this.ListonDoing.num - this.ListonDoing.Lastednum;
        
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
    },
    creatInform(data, node) {
        let inform = null;
        if (this.clickInformPool.size > 0) {
            inform = this.clickInformPool.get();
        } else {
            inform = cc.instantiate(this.inf);
        }



        inform.parent = this.node;

        inform.getComponent("ini").ini(data, node);

        this.scheduleOnce(function () {
            this.informKill(inform);
        }, 2)
    },
    informKill(infor) {
        this.clickInformPool.put(infor);
    },
    readList(temp) {


        cc.loader.loadRes('listjs.json', function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            var l = object.json.List;
            var i = Math.floor(Math.random() * l.length);

            temp.num = l[i].num;
            temp.Lastednum = 0;
            temp.name = l[i].name;
            temp.ListType = l[i].ListType;
            temp.Money = l[i].money;
            
            console.log(temp.name + "," + temp.num);

            //console.log(i);
        });

        console.log(temp);
    }
});