
cc.Class({
    extends: cc.Component,

    properties: {
        spr:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

     update (dt) {
         this.spr.fillStart+=0.01;
         if(this.spr.fillStart>=1){
             this.spr.fillStart=0;
         }
     },
});
