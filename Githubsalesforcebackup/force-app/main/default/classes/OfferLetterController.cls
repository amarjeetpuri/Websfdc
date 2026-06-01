public class OfferLetterController {
    public amrik__Candidate_Information__c reList{get;set;}
    public string strDate{get;set;} 
    public string joiningDate{get;set;} 
    public string OfferAcceptanceDate{get;set;} 
    public string OffreleDate{get;set;} 
    public decimal totalContribution{get;set;}
    public string totalContributionAnnual{get;set;}
    public decimal totalGross{get;set;}
    public string totalGrossAnnual{get;set;}
    public string totalGrossMonthly{get;set;}
    public string Reptime{get;set;} 
    public string Basic{get;set;} 
    public string hra{get;set;} 
    public string UniformAll{get;set;} 
    public string gratuityAmount{get;set;}
    public string gratuityAmountAnnual{get;set;}
    public string trainingAmountMonthly{get;set;}
    public string trainingAmountAnnual{get;set;}
    public string licAnnual{get;set;}
    public string FoodAll{get;set;} 
    public string MedicalAllowance{get;set;} 
    public string TravelAllowance{get;set;} 
    public string TransportAllowance{get;set;} 
    public string monthlySalary{get;set;} 
    public string totalCTCFormat{get;set;}
    
    public string BasicAnnual{get;set;} 
    public string hraAnnual{get;set;} 
    public string medicalInsurenceAnnual{get;set;} 
    public string UniformAllAnnual{get;set;} 
    public string FoodAllAnnual{get;set;} 
    public string performanceAnnual{get;set;} 
    public string MedicalAllowanceAnnual{get;set;} 
    public string TravelAllowanceAnnual{get;set;} 
    public string TransportAllowanceAnnual{get;set;} 
    public string totalCTCFormatAnnual{get;set;}
    public string currentYear{get;set;}
    public string nextYear{get;set;}
    public string ids;
    public OfferLetterController(Id newIds) {
        this.ids = newIds;
        system.debug('newIds=='+newIds);
        attachPDFToAccounts(newIds);
    }
    
    public OfferLetterController(ApexPages.StandardController stdController){
        reList=new amrik__Candidate_Information__c ();
        ids=apexpages.currentpage().getparameters().get('id');
        reList=[SELECT amrik__Company_Addressa__c,amrik__Financial_Year__c,amrik__HR_Name__c,
                amrik__Basic__c,name,amrik__Candidate_Position__c,amrik__Company_Address__c,
                amrik__Date_Of_Joining__c,amrik__Day_in_text_Offer_Acceptance_Date__c,
                amrik__Day_in_text_Offer_Release_Date__c,amrik__Day_in_text__c,amrik__Food_All__c,
                amrik__H_R_A__c,amrik__Medical_Allowance__c,amrik__Mobile_Allowance__c,
                amrik__Offer_Acceptance_Date__c,amrik__Offer_Release_Date__c,amrik__Total_CTC__c,
                amrik__Transport_Allowance__c,amrik__Travel_Allowance__c,amrik__Uniform_All__c,
                amrik__Gratuity__c,amrik__Training_Certification__c,amrik__Medical_Insurance__c,
                amrik__LIC_Insurance__c,amrik__Performance_Bonus__c FROM amrik__Candidate_Information__c where id=:ids ];
        totalCTCFormat = reList.amrik__Total_CTC__c.format();
        
        date d=reList.amrik__Date_Of_Joining__c;
        date jD=reList.amrik__Offer_Release_Date__c;
        date od=reList.amrik__Offer_Acceptance_Date__c;
        totalContribution=reList.amrik__Gratuity__c+reList.amrik__Training_Certification__c +
            reList.amrik__Medical_Insurance__c +reList.amrik__LIC_Insurance__c+reList.amrik__Performance_Bonus__c;
         totalContributionAnnual=integer.valueof(totalContribution).format();
        
        totalGross=reList.amrik__Basic__c+reList.amrik__H_R_A__c+
            reList.amrik__Uniform_All__c+reList.amrik__Food_All__c+
            reList.amrik__Medical_Allowance__c+reList.amrik__Travel_Allowance__c;
        totalGrossAnnual=integer.valueof(totalGross).format();
        totalGrossMonthly=integer.valueof(totalGross/12).format();
        strDate          = DateTime.newInstance(d.year(),  d.month(),  d.day()).format('dd-MM-yyyy');
        OffreleDate      = DateTime.newInstance(jD.year(), jD.month(), jD.day()).format('dd-MM-yyyy');
        joiningDate      = DateTime.newInstance(d.year(),  d.month(),  d.day()).format('dd-MM-yyyy');
        OfferAcceptanceDate = DateTime.newInstance(od.year(), od.month(), od.day()).format('dd-MM-yyyy');
        Reptime=DateTime.newInstance(d.year(),d.month(),d.day()).format('HH:mm:ss');
        BasicAnnual=integer.valueof(reList.amrik__Basic__c).format();
        hraAnnual=integer.valueof(reList.amrik__H_R_A__c).format();
        gratuityAmountAnnual=integer.valueof(reList.amrik__Gratuity__c).format();
        trainingAmountAnnual=integer.valueof(reList.amrik__Training_Certification__c).format();
        performanceAnnual=integer.valueof(reList.amrik__Performance_Bonus__c).format();
        licAnnual=integer.valueof(reList.amrik__LIC_Insurance__c).format();
        medicalInsurenceAnnual=integer.valueof(reList.amrik__Medical_Insurance__c).format();
        UniformAllAnnual=integer.valueof(reList.amrik__Uniform_All__c).format();
        FoodAllAnnual=integer.valueof(reList.amrik__Food_All__c).format();
        MedicalAllowanceAnnual=integer.valueof(reList.amrik__Medical_Allowance__c).format();
        TravelAllowanceAnnual=integer.valueof(reList.amrik__Travel_Allowance__c).format();
        TransportAllowanceAnnual=integer.valueof(reList.amrik__Transport_Allowance__c).format();
        
        Basic =integer.valueof(reList.amrik__Basic__c/12).format();
        hra=integer.valueof(reList.amrik__H_R_A__c/12).format();
        UniformAll =integer.valueof(reList.amrik__Uniform_All__c/12).format();
        gratuityAmount=integer.valueof(reList.amrik__Gratuity__c/12).format();
        FoodAll =integer.valueof(reList.amrik__Food_All__c/12).format();
        trainingAmountMonthly=integer.valueof(reList.amrik__Training_Certification__c/12).format();
        MedicalAllowance =integer.valueof(reList.amrik__Medical_Allowance__c/12).format();
        TravelAllowance =integer.valueof(reList.amrik__Travel_Allowance__c/12).format();
        TransportAllowance =integer.valueof(reList.amrik__Transport_Allowance__c/12).format();
        monthlySalary=integer.valueof(reList.amrik__Total_CTC__c/12).format();
        
        String myGeneratedFileName = reList.name+' Offer Letter.pdf';
        Apexpages.currentPage().getHeaders().put('content-disposition', '; filename='+myGeneratedFilename); 
        
    }

    @future(callout=true)
    public static void attachPDFToAccounts(Id recordIds) {
        List<Attachment> attachments = new List<Attachment>();
        amrik__Candidate_Information__c reList=[SELECT amrik__Company_Addressa__c,amrik__Financial_Year__c,amrik__HR_Name__c,
                                                amrik__Basic__c,name,amrik__Candidate_Position__c,amrik__Company_Address__c,
                                                amrik__Date_Of_Joining__c,amrik__Day_in_text_Offer_Acceptance_Date__c,
                                                amrik__Day_in_text_Offer_Release_Date__c,amrik__Day_in_text__c,amrik__Food_All__c,
                                                amrik__H_R_A__c,amrik__Medical_Allowance__c,amrik__Mobile_Allowance__c,
                                                amrik__Offer_Acceptance_Date__c,amrik__Offer_Release_Date__c,amrik__Total_CTC__c,
                                                amrik__Transport_Allowance__c,amrik__Travel_Allowance__c,amrik__Uniform_All__c,
                                                amrik__Gratuity__c,amrik__Training_Certification__c,amrik__Medical_Insurance__c,
                                                amrik__LIC_Insurance__c,amrik__Performance_Bonus__c FROM amrik__Candidate_Information__c where id=:recordIds];
        
        
        // Generate PDF content from Visualforce page
        PageReference vfPage = Page.OfferLetter;
        vfPage.getParameters().put('id', recordIds);
        Blob pdfBlob = vfPage.getContentAsPDF();
        
        // Create attachment for the account
        Attachment attach = new Attachment();
        attach.ParentId = recordIds;
        attach.Name = reList.name+' Offer Letter.pdf';
        attach.Body = pdfBlob;
        attach.ContentType = 'application/pdf';
        attachments.add(attach);
        
        if (!attachments.isEmpty()) {
            insert attachments;
        }
    }
}