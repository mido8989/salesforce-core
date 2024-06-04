/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 10-20-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
trigger AccountDetailTrigger on AccountDetail__c (before insert, before update) {
    // AccountDetail.LastYearRevenue__c 값이 등록/수정 될  경우 Account의 AnnualRevenue 필드에 더해주기
    if (Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)) {
        List<AccountDetail__c> newlist = Trigger.new;
        Set<ID> accIdSet = new Set<ID>();
        Map<ID, AccountDetail__c> accMap = new Map<ID, AccountDetail__c>(); 
          
        for (AccountDetail__c ad : newlist) {
            ID accId = ad.Account__c;
            if(ad.LastYearRevenue__c !=null && ad.LastyearRevenue__c > 0){
                accIdSet.add(ad.Account__c);
                accMap.put(accId, ad);
                //acc.AnnualRevenue += ad.LastyearRevenue__c;
            }
            
        }
        List<Account> accList = [SELECT Id, AnnualRevenue FROM Account WHERE Id IN :accIdSet];
        for (Account acc : accList) {
            Double lyr = accMap.get(acc.Id)?.LastYearRevenue__c;
            if(acc.AnnualRevenue == null)
                acc.AnnualRevenue = lyr;
            else
            acc.AnnualRevenue += lyr;
        }
        update accList;
    }

}