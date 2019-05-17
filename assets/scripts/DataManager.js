var data=cc.Class({
    name:data,
    properties:{
        money:{default:0,type:cc.Integer},//金钱
        level:{default:1,type:cc.Integer},//等级
        buffes:{default:[],type:[cc.Node]},//buff数组
        List:{default:[],type:[cc.Node]},//订单数组
    }
})