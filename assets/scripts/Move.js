var pointxy = cc.Class({
    properties: {
        x: {
            default: 0,
            type: cc.Integer
        },
        y: {
            default: 0,
            type: cc.Integer
        },
    },
})

cc.Class({
    extends: cc.Component,

    properties: {
        cus: {
            default: [],
            type: [cc.Node]
        },
        pos: {
            default: [],
            type: [pointxy]
        },
        outCus: {
            default: 0,
            type: cc.Integer
        },
        inPoint: cc.Node,
        outPoint: cc.Node,
        fi:true,
    },

    start() {
        this.outCus = this.cus.length - 1;
        for (var i = 0; i < this.cus.length; i++) {
            this.pos[i].x = this.cus[i].x;
            this.pos[i].y = this.cus[i].y;
        }
        //this.pos[this.cus.length].x = this.inPoint.x;
        //this.pos[this.cus.length].y = this.inPoint.y;

        //this.pos[this.cus.length].x = this.outPoint.x;
        //this.pos[this.cus.length].y = this.outPoint.y;

        
        //var t = setTimeout("this.setPos()",10000);

    },

     update (dt) {
         
     },
    Move() {
        this.fi = false;
        var f1=false;
        var f2=false;
        var f3 =false;
        this.MoveTO(this.cus[this.outCus], this.outPoint.x, this.outPoint.y, 0.3)
        this.scheduleOnce(function () {
            this.setPos();
            for (var i = 0; i < this.cus.length - 1; i++) {
                this.MoveTO(this.cus[i], this.pos[i + 1].x, this.pos[i + 1].y,0.3);
            }
            f1 = true;
            this.fi = f1&f2&f3;
        }, 0.3)
        this.scheduleOnce(function () {
            var tempX;
            var tempY;
            for (var i = this.outCus; i > 0; i--) {
                tempX = this.cus[i - 1].x;
                tempY = this.cus[i - 1].y;
                this.cus[i - 1].x = this.cus[i].x;
                this.cus[i - 1].y = this.cus[i].y;
                this.cus[i].x = tempX;
                this.cus[i].y = tempY;
            }
            f2 = true;
            this.fi = f1&f2&f3;
        }, 0.6)
        this.scheduleOnce(function () {
            //let temp = cc.moveTo(1, cc.v2(this.pos[0].x, this.pos[0].y));
            //this.cus[0].runAction(temp);
            this.MoveTO(this.cus[0], this.pos[0].x, this.pos[0].y, 0.3);
            f3 = true;
            this.fi = f1&f2&f3;
        }, 0.6)


    },

    setPos() {
        this.cus[this.outCus].x = this.inPoint.x;
        this.cus[this.outCus].y = this.inPoint.y;
    },
    MoveTO(node, x, y, time) {
        let temp = cc.moveTo(time, cc.v2(x, y));
        node.runAction(temp);
    }
});