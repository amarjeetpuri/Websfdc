/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 06-01-2026
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class ExperienceLetterController {
    public amrik__Relieving_Letter__c reList{get;set;}
    public string lastWorkingDay{get;set;} 
    public string joiningDate{get;set;} 
    public string positionName{get;set;} 
    public string ids; 
    public string genderStatus{get;set;}
    public string heShe{get;set;}
    public ExperienceLetterController(Id newIds){
        this.ids = newIds; 
        system.debug('newIds=='+newIds);
        attachPDFToAccounts(newIds);
    }
    public ExperienceLetterController(Apexpages.StandardController std){
        reList=new amrik__Relieving_Letter__c();
        ids=Apexpages.currentpage().getparameters().get('id');
        system.debug('!!ids:--------------------'+ids);
        reList=[select id,amrik__Hr_Director_Name__c,amrik__Candidate_Name__r.amrik__Gender__c,amrik__Candidate_Name__r.amrik__Candidate_Position__c,amrik__Candidate_Name__r.name,amrik__Candidate_Name__r.amrik__Date_Of_Joining__c,amrik__Hr_Manager_Name__c,amrik__Last_Working_Day__c,amrik__Subject__c from amrik__Relieving_Letter__c where id=:ids ];
        positionName=reList.amrik__Candidate_Name__r.amrik__Candidate_Position__c;
        date d=reList.amrik__Last_Working_Day__c;
        genderStatus = reList.amrik__Candidate_Name__r.amrik__Gender__c == 'female' ? 'her' :'his' ;
        heShe = reList.amrik__Candidate_Name__r.amrik__Gender__c == 'female' ? 'she' :'he' ;
        date jd=reList.amrik__Candidate_Name__r.amrik__Date_Of_Joining__c;
        system.debug('!!jD:--'+jD);
        system.debug('!!1:--'+d);
        lastWorkingDay=DateTime.newInstance(d.year(),d.month(),d.day()).format('dd-MM-YYYY');
        joiningDate=DateTime.newInstance(jd.year(),jd.month(),jd.day()).format('dd-MM-YYYY');
        system.debug('!!joiningDate:--'+joiningDate);
        
        String myGeneratedFileName = reList.amrik__Candidate_Name__r.name+' Experience Letter.pdf';
        Apexpages.currentPage().getHeaders().put('content-disposition', '; filename='+myGeneratedFilename); 
        
    }
    
    @future(callout=true)
    public static void attachPDFToAccounts(Id recordIds) {
        system.debug('recordIds' +recordIds);
        List<Attachment> attachments = new List<Attachment>();
        amrik__Relieving_Letter__c reList=[select id,amrik__Hr_Director_Name__c,amrik__Candidate_Name__r.name,
                                           amrik__Candidate_Name__r.amrik__Date_Of_Joining__c,amrik__Hr_Manager_Name__c,
                                           amrik__Last_Working_Day__c,amrik__Subject__c from amrik__Relieving_Letter__c
                                           where id=:recordIds];
        // For Experience Letter
        // Generate PDF content from Visualforce page
        PageReference vfPageExp = Page.ExperienceLetterPage;
        vfPageExp.getParameters().put('id', recordIds);
        Blob pdfBlobExp = vfPageExp.getContentAsPDF();
        // Create attachment for the account
        Attachment attachexp = new Attachment();
        attachexp.ParentId = recordIds;
        attachexp.Name = reList.amrik__Candidate_Name__r.name+' Experience Letter.pdf';
        attachexp.Body = pdfBlobExp;
        attachexp.ContentType = 'application/pdf';
        attachments.add(attachexp);
        
        if (!attachments.isEmpty()) {
            insert attachments;
        } 
        
    }
}