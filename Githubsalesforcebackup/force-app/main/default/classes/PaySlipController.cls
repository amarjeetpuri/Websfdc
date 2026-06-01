public class PaySlipController {
    public amrik__Salary_Slip__c slrySlip{get;set;}
    public string monthName{get;set;}
    public string BasicMonth{get;set;} 
    public string hraMonth{get;set;} 
    public string UniformAllMonth{get;set;} 
    public string FoodAllMonth{get;set;} 
    public string MedicalAllowanceMonth{get;set;} 
    public string TravelAllowanceMonth{get;set;} 

    public string totalMonthSalary{get;set;} 
    public string ids;
    public PaySlipController(Id newIds) {
        this.ids = newIds;
        system.debug('newIds=='+newIds);
        attachPDFToAccounts(newIds);
    }
    public PaySlipController( Apexpages.StandardController std){
        slrySlip=new amrik__Salary_Slip__c();
        ids=Apexpages.currentpage().getparameters().get('id');
        system.debug('amarjeet=='+ids);
        slrySlip=[SELECT amrik__Bank_Account_Number__c,amrik__Year__c,amrik__Month_Days__c,amrik__Effective_Working_Days__c,amrik__Candidate_Name__r.name,amrik__Basic__c,
                  amrik__Candidate_Name__c,amrik__Company_Address__c,amrik__Designation__c,amrik__Candidate_Name__r.amrik__Employee_Id__c,
                  amrik__ESI_Number__c,amrik__Food_All__c,amrik__HRA__c,amrik__Medical_Allowance__c,amrik__Mobile_Allowance__c,
                  amrik__Pan_Number__c,amrik__salary_Head__c,amrik__Salary_Month__c,amrik__Salary_Year__c,
                  amrik__Total_Month_Salary__c,amrik__Travel_Allowance__c,amrik__Uniform_All__c FROM amrik__Salary_Slip__c
                  where id=:ids];
        monthName=slrySlip.amrik__Salary_Month__c.toUppercase();
        
        BasicMonth=slrySlip.amrik__Basic__c.format();
        hraMonth=slrySlip.amrik__HRA__c.format();
        UniformAllMonth=slrySlip.amrik__Uniform_All__c.format();
        FoodAllMonth=slrySlip.amrik__Food_All__c.format();
        MedicalAllowanceMonth=slrySlip.amrik__Medical_Allowance__c.format();
        TravelAllowanceMonth=slrySlip.amrik__Travel_Allowance__c.format();
      //  TransportAllowanceMonth=slrySlip.amrik__Transport_Allowance__c.format();
        totalMonthSalary=integer.valueof(slrySlip.amrik__Total_Month_Salary__c).format();
        String myGeneratedFileName = slrySlip.amrik__Salary_Month__c+' Pay slip.pdf';
        Apexpages.currentPage().getHeaders().put('content-disposition', '; filename='+myGeneratedFilename); 
        
    } 
    
    @future(callout=true)
    public static void attachPDFToAccounts(Id recordIds) {
        List<Attachment> attachments = new List<Attachment>();
        amrik__Salary_Slip__c slrySlip=[SELECT amrik__Bank_Account_Number__c,amrik__Year__c,amrik__Month_Days__c,amrik__Effective_Working_Days__c,amrik__Candidate_Name__r.name,amrik__Basic__c,
                  amrik__Candidate_Name__c,amrik__Company_Address__c,amrik__Designation__c,amrik__Candidate_Name__r.amrik__Employee_Id__c,
                  amrik__ESI_Number__c,amrik__Food_All__c,amrik__HRA__c,amrik__Medical_Allowance__c,amrik__Mobile_Allowance__c,
                  amrik__Pan_Number__c,amrik__salary_Head__c,amrik__Salary_Month__c,amrik__Salary_Year__c,
                  amrik__Total_Month_Salary__c,amrik__Travel_Allowance__c,amrik__Uniform_All__c FROM amrik__Salary_Slip__c
                  where id=:recordIds];

        // Generate PDF content from Visualforce page
        PageReference vfPage = Page.PaySlipPage;
        vfPage.getParameters().put('id', recordIds);
        Blob pdfBlob = vfPage.getContentAsPDF();
        
        // Create attachment for the account
        Attachment attach = new Attachment();
        attach.ParentId = recordIds;
        attach.Name = slrySlip.amrik__Salary_Month__c+' Pay slip.pdf';
        attach.Body = pdfBlob;
        attach.ContentType = 'application/pdf';
        attachments.add(attach);
        
        if (!attachments.isEmpty()) {
            insert attachments;
        }
    }
    
}