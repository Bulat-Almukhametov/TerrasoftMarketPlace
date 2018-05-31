define("ClientMessageBridge", ["ModalBox"], function (ModalBox) {
        return {
            methods: {
                init: function () {
                    this.callParent(arguments);

                    context = this;
                    document.addEventListener('keyup', this.openQueryEditor, false);
                },

                openQueryEditor: function (e) {
                    if (e.ctrlKey && e.keyCode == 81) {
                        ModalBox.show({"heightPixels": "700", "widthPixels": "1080"},
                            function () {
                                var modalBoxContainer = ModalBox.getInnerBox();
                                this.sandbox.unloadModule("QueryEditor", modalBoxContainer.id);
                            },
                            context);
                        var modalBoxContainer = ModalBox.getInnerBox();
                        context.sandbox.loadModule("NavQueryEditModalBoxLoader", {
                            renderTo: modalBoxContainer.id,
                            id: "QueryEditor",
                            keepAlive: true
                        });
                    }
                }

            }
        };
    });