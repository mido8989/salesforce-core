import { LightningElement, api, wire, track } from 'lwc';

// [Apex Method]
import fn_initialize from "@salesforce/apex/CustomerProfileController.initialize";

export default class CustomerProfile extends LightningElement {
    @api recordId; //자동으로 가져오기위한 외부에 노출 된 변수
    @track accountDetail;
    @track accountDetailName;
    @track accountDetailLastYearRevenue;
    @track accountName;
    @track accountPhone;
    @track accountCeo;
    
    connectedCallback() {

        this.accountDetailName = null;
        this.accountDetailLastYearRevenue = null;
        this.accountName = null;
        this.accountPhone = null;
        this.accountCeo = null;

        fn_initialize({recordId: this.recordId})
        .then((resp) => {
            // variables settings from response.data
            console.log(resp);
            this.accountDetail = JSON.parse(JSON.stringify(resp.data.accountDetail));
            this.accountDetailName = this.accountDetail.Name;
            this.accountDetailLastYearRevenue = this.accountDetail.LastYearRevenue__c;
            this.accountName = this.accountDetail.Account__r.Name;
            this.accountPhone = this.accountDetail.Account__r.Phone;
            this.accountCeo = this.accountDetail.Account__r.ceoName__c;
        })
        .catch((err) => {
            console.error("fn_initialize error ==> " + JSON.stringify(err));
        })         
    }
}