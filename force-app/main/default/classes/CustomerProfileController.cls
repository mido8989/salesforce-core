/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 10-18-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class CustomerProfileController {
    @AuraEnabled

    public static ComponentResponse initialize(String recordId){

        ComponentResponse response = new ComponentResponse();

        try {

            //AccountDetail RecordId를 이용하여 Account(Master-Detail)Id를 조회 후,

            //Account Record 조회 및 ComponentResponse리턴

            AccountDetail__c accDetail = [

                SELECT

                    Id,

                    Name,

                    Account__c,

                    LastYearRevenue__c,

                    Account__r.Name,

                    Account__r.Phone,

                    Account__r.ceoName__c   //custome field는 무조건 __c 를 붙여야한다!

                FROM AccountDetail__c

                WHERE Id = :recordId

            ];



            response.setData('accountDetail', accDetail);



        } catch (Exception e) {

            throw new AuraHandledException(e.getMessage());

        }

        return response;

    }
}