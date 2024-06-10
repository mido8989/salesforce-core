({
    //Other functions...
    refreshData: function(component) {
        var action = component.get("c.getLeads");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.leads", response.getReturnValue());
            } else {
                console.log('Problem getting leads, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    }, 

    createdLead : function() {
        var createdRecordEvent = $A.get("e.force:createRecord");
        if (createdRecordEvent) {
            createdRecordEvent.setParams({
                "entityApiName" : "Lead"
            });
            createdRecordEvent.fire();
        } else {
            alert("This feature is not supported here");
        }
    }
})