public class RelievingLetterController {
    public amrik__Relieving_Letter__c reList{get;set;}
    public string lastWorkingDay{get;set;} 
    public string joiningDate{get;set;}
    public string ids; 
    public RelievingLetterController(Id newIds){
        this.ids = newIds;
        system.debug('newIds=='+newIds);
        attachPDFToAccounts(newIds);
    }
    public RelievingLetterController(Apexpages.StandardController std){
        reList=new amrik__Relieving_Letter__c();
        ids=Apexpages.currentpage().getparameters().get('id');
        system.debug('!!ids:--------------------'+ids);
        reList=[select id,amrik__Hr_Director_Name__c,amrik__Candidate_Name__r.name,amrik__Candidate_Name__r.amrik__Date_Of_Joining__c,amrik__Hr_Manager_Name__c,amrik__Last_Working_Day__c,amrik__Subject__c from amrik__Relieving_Letter__c where id=:ids ];
        
        date d=reList.amrik__Last_Working_Day__c;
        date jd=reList.amrik__Candidate_Name__r.amrik__Date_Of_Joining__c;
        system.debug('!!jD:--'+jD);
        system.debug('!!1:--'+d);
        lastWorkingDay=DateTime.newInstance(d.year(),d.month(),d.day()).format('dd-MM-YYYY');
        joiningDate=DateTime.newInstance(jd.year(),jd.month(),jd.day()).format('dd-MM-YYYY');
        system.debug('!!joiningDate:--'+joiningDate);
        
        String myGeneratedFileName = reList.amrik__Candidate_Name__r.name+' Relieving Letter.pdf';
        Apexpages.currentPage().getHeaders().put('content-disposition', '; filename='+myGeneratedFilename); 
        
    }
    
    @future(callout=true)
    public static void attachPDFToAccounts(Id recordIds) {
        // for Relieving Letter
        List<Attachment> attachments = new List<Attachment>();
        amrik__Relieving_Letter__c reList=[select id,amrik__Hr_Director_Name__c,amrik__Candidate_Name__r.name,
                                           amrik__Candidate_Name__r.amrik__Date_Of_Joining__c,amrik__Hr_Manager_Name__c,
                                           amrik__Last_Working_Day__c,amrik__Subject__c from amrik__Relieving_Letter__c
                                           where id=:recordIds];
       // Generate PDF content from Visualforce page
        PageReference vfPage = Page.RelievingLetterPage;
        vfPage.getParameters().put('id', recordIds);
        Blob pdfBlob = vfPage.getContentAsPDF();
        
        // Create attachment for the account
        Attachment attach = new Attachment();
        attach.ParentId = recordIds;
        attach.Name = reList.amrik__Candidate_Name__r.name+' Relieving Letter.pdf';
        attach.Body = pdfBlob;
        attach.ContentType = 'application/pdf';
        attachments.add(attach);
        
        if (!attachments.isEmpty()) {
            insert attachments;
        } 
        
    }
    
}