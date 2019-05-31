var c = require("common")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.readjson();
     },

    start () {
        cc.director.loadScene("mmm");
    },

     update (dt) {
         
     },
     readjson(){
        
        cc.loader.loadRes('listjs.json', function (err, object) {
            if (err) {
                console.log(err);
                return;
            }

            c.data = object;

        });
    }
});
