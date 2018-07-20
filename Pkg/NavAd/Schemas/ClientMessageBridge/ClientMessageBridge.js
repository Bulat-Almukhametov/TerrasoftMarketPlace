define("ClientMessageBridge", [],
    function() {
        return {
          methods: {
           messages: {
            "NotifyUserByModalBox": {
             "mode": Terrasoft.MessageMode.BROADCAST,
             "direction": Terrasoft.MessageDirectionType.PUBLISH
            }
           },
           init: function() {
              this.callParent(arguments);
              this.addMessageConfig({
               sender: "NotifyUserByModalBox",
               messageName: "NotifyUserByModalBox"
              });
             },
           afterPublishMessage: function(
                    sandboxMessageName,
                    webSocketBody,
                    result,
                    publishConfig) {
                    if (sandboxMessageName === "NotifyUserByModalBox")
                    {
                     this.Terrasoft.utils.showMessage({
                      caption: webSocketBody,
                      buttons: [this.Terrasoft.MessageBoxButtons.OK],
                      defaultButton: 0,
                      style: this.Terrasoft.MessageBoxStyles.BLUE,
                      scope: this
                     });
                    }
                   }
          }
         };
       });