({
    doInit : function(component, event, helper) {
        var action = component.get("c.getLeads");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.leads", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    navigateToRecord : function(component, event, helper) {
        var navService = component.find("navService");
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.recordid,
                actionName: 'view'
            }
        };
        navService.navigate(pageReference);
    },

    selectLead : function(component, event, helper) {
        var selectedLeadIds = component.get("v.selectedLeadIds");
        var checkbox = event.getSource();
        if (checkbox.get("v.checked")) {
            selectedLeadIds.push(checkbox.get("v.value"));
        } else {
            var index = selectedLeadIds.indexOf(checkbox.get("v.value"));
            if (index !== -1) {
                selectedLeadIds.splice(index, 1);
            }
        }
        component.set("v.selectedLeadIds", selectedLeadIds);
    },

    deleteLeads : function(component, event, helper) {
        var selectedLeadIds = component.get("v.selectedLeadIds");
        var deleteAction = component.get("c.deleteLeadsByIds");
        deleteAction.setParams({
            leadIds: selectedLeadIds
        });
        deleteAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Records are deleted.");
                // Show a toast message
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The records have been deleted successfully.",
                    "type": "success"
                });
                toastEvent.fire();
                // Refresh the data
                helper.refreshData(component);
            } else if (state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (state === "ERROR") {
                console.log('Problem deleting records, error: ' + JSON.stringify(response.getError()));
            } else {
                console.log('Unknown problem, state: ' + state + ', error: ' + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(deleteAction);
    }, 

    createLead : function(component, event, helper) {
        helper.createdLead();
    }, 

    createLeads : function(component, event, helper) {
        var numLeads = component.get("v.numLeads");
        var action = component.get("c.createLeads");
        action.setParams({ numLeads : numLeads });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Refresh the component or do something else
            } else {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    }
})