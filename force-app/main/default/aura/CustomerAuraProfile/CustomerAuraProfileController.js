({

    init: function(component, event, helper){

        helper.fn_init(component, event, helper);

    }

    /*myAction : function(component, event, helper) {

        component.set("v.Columns", [

            //{label:"Account Name", fieldName:"Account__r.Name", type:"text"},

            //{label:"Phone", fieldName:"Account__r.Phone", type:"phone"},

            {label:"Name", fieldName:"Name", type:"text"},

            {label:"Last Year Revenue", fieldName:"LastYearRevenue__c", type:"Number"}

        ]);

        var action = component.get("c.getAccountDetail");

        action.setParams({

            recordId: component.get("v.recordId")

        });

        action.setCallback(this, function(data) {

            component.set("v.AccountDetail", data.getReturnValue());

        });

        $A.enqueueAction(action);

        

        

        

        var action2 = component.get("c.getAccount");

        action2.setParams({

            recordId: component.get("v.recordId")

        });

        action2.setCallback(this, function(data) {

            component.set("v.Account", data.getReturnValue());

        });

        $A.enqueueAction(action2);  

    }*/

})