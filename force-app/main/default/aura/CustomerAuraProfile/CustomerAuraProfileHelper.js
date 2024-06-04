({



    fn_init: function (component, event, helper){

        this.fn_getRecordId(component, event, helper);

    },



    fn_getRecordId: function (component, event, helper) {

        var recordId = component.get('v.recordId');



        var params = {

            recordId: recordId

        };



        var action = component.get("c.initialize");

        action.setParams(params);

        action.setCallback(this, function (response){

            var state = response.getState();

            component.set('v.IsLoading', false);

            if (state === "SUCCESS") {

                var ret = response.getReturnValue(); //ComponentResponse

                component.set('v.accountInfo', ret.data.accountDetail);

            } else if (state === "INCOMPLETE") {

                // do something

            } else if (state === "ERROR") {

                console.log("Failed with state: " + state);

            }

        });



        $A.enqueueAction(action);

    }

})