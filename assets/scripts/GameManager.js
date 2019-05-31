var c = require("common")
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
            default: 0,
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
            default: 0,
            type: cc.Integer
        },
        Money: {
            default: 0,
            type: cc.Integer
        },
    }
})

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
        buffprefab: {
            default: [],
            type: cc.Prefab
        },
        BuffShow: {
            default: null,
            type: cc.Layout
        },
        LowMoney: {
            default: null,
            type: cc.Node
        },
        Showed: false,
        star: cc.Prefab,
        
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
        this.kind = 0;
        this.AddMoney(200);
        
    },

    update(dt) {

        this.Doing();


    },

    Doing() {

        if (this.ListonDoing == null) {
            this.Refrsh();
        } else if (this.Showed) {
            if (this.data.buffes[1] != null)
                this.ListonDoing.Lastednum += this.data.buffes[1].getComponent("Buff").autonum;

            var bili = this.ListonDoing.Lastednum / this.ListonDoing.num;
            var sheng = Math.floor(this.ListonDoing.num - this.ListonDoing.Lastednum);
            this.list_back.fillStart = bili;
            this.nes.string = "需要 X" + sheng;
            if (this.ListonDoing.Lastednum >= this.ListonDoing.num) {
                this.AddMoney(this.ListonDoing.Money);
                if (this.ListonDoing.ListType == 1) {
                    this.AddLV(1);
                }
                this.Refrsh();

            }
        }


    },

    Click() {
        if (this.ListonDoing != null && this.Showed) {
            let num = this.ClickNum;
            if (this.data.buffes[0] != null)
                num += this.data.buffes[0].getComponent("Buff").addnum;
            this.ListonDoing.Lastednum += num;
            this.creatInform(num, this.button);
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
        //console.log(this.ListonDoing.ListType);
    },

    AddBuff(num) {

        switch (num) {
            case "0":
                
                if (this.data.buffes[0] == null) {
                    var temp = cc.instantiate(this.buffprefab[0]);
                    if (this.data.money >= temp.getComponent("Buff").money) {
                        this.data.buffes[0] = temp;
                        temp.parent = this.BuffShow.node;
                        this.AddMoney(-temp.getComponent("Buff").money);
                        this.data.buffes[0].getComponent("Buff").money *= 2;
                        console.log(temp.getComponent("Buff").describ);
                    } else {
                        this.LowMoney.active = true;
                        this.scheduleOnce(function () {
                            this.LowMoney.active = false;
                        }, 2);
                    }
                }else{
                    if (this.data.money >= this.data.buffes[0].getComponent("Buff").money) {
                        
                        this.AddMoney(-this.data.buffes[0].getComponent("Buff").money);
                        console.log(this.data.buffes[0].getComponent("Buff").money);
                        this.data.buffes[0].getComponent("Buff").Upgrade();
                    } else {
                        this.LowMoney.active = true;
                        this.scheduleOnce(function () {
                            this.LowMoney.active = false;
                        }, 2);
                    }
                }
               
                break;
            case "1":
                    if (this.data.buffes[1] == null) {
                        var temp = cc.instantiate(this.buffprefab[1]);
                        if (this.data.money >= temp.getComponent("Buff").money) {
                            this.data.buffes[1] = temp;
                            temp.parent = this.BuffShow.node;
                            this.AddMoney(-temp.getComponent("Buff").money);
                            this.data.buffes[1].getComponent("Buff").money *= 2;
                            console.log(temp.getComponent("Buff").describ);
                        } else {
                            this.LowMoney.active = true;
                            this.scheduleOnce(function () {
                                this.LowMoney.active = false;
                            }, 2);
                        }
                    }else{
                        if (this.data.money >= this.data.buffes[1].getComponent("Buff").money) {
                            
                            this.AddMoney(-this.data.buffes[1].getComponent("Buff").money);
                            console.log(this.data.buffes[1].getComponent("Buff").money);
                            this.data.buffes[1].getComponent("Buff").Upgrade();
                        } else {
                            this.LowMoney.active = true;
                            this.scheduleOnce(function () {
                                this.LowMoney.active = false;
                            }, 2);
                        }
                    }
                   
                    break;
            default:
                console.log(num);
                break;

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


        var l = c.data.json.List;
        var i = Math.floor(Math.random() * l.length);

        temp.num = l[i].num;
        temp.Lastednum = 0;
        temp.name = l[i].name;
        temp.ListType = l[i].ListType;
        temp.Money = l[i].money;

        console.log(temp.ListType);
    },

});