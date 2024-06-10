/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 06-10-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
@RestResource(urlMapping='/LeadController/*')
global class LeadController {

    @AuraEnabled
    @HttpGet
    global static List<Lead> getLeads() {
        return [SELECT Id, Name, LastName, Company, Status FROM Lead LIMIT 100 ];
    }

    // @AuraEnabled
    // public static void deleteLeadsByIds(List<Id> leadIds) {
    //     List<Lead> leadsToDelete = [SELECT Id FROM Lead WHERE Id IN :leadIds];
    //     delete leadsToDelete;
    // }

    @AuraEnabled
    @HttpPost
    global static void createLeads(Integer numLeads) {
        System.debug('createLeads method called with numLeads: ' + numLeads);
        List<Lead> leadsToInsert = new List<Lead>();
        for(Integer i =0; i<numLeads; i++) {
            Lead newLead = new Lead (
                LastName = 'TestLastName' + i,
                Company = 'TestCompany' + i,
                Status = 'Open - Not Contacted'
            );
            leadsToinsert.add(newLead);
        }
        insert leadsToInsert;
        System.debug('createLeads method finished, inserted leads: ' + leadsToInsert.size());
    }
}