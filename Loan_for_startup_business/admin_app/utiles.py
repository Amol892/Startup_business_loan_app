import PyPDF2
from openpyxl import Workbook


#User detection
def detectUser(user):
    if user.role == 'cs':
        redirectURL = 'customerDashboard'
        return redirectURL
    elif user.role == 'lr':
        redirectURL = 'lrDashboard'
        return redirectURL
    elif user.role == 'oh':
        redirectURL = 'ohDashboard'
        return redirectURL
    elif user.role == 'lo':
        redirectURL = 'lsoDashboard'
        return redirectURL
    elif user.role == 'ad':
        redirectURL = 'adminDashboard'
        return redirectURL
    elif user.role == 'ah':
        redirectURL = 'ahDashboard'
        return redirectURL
    
    
def fetchPDFData(file):
    # Open the PDF file you want to convert
    with open(str(file), 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # Create a new Excel workbook and select the active sheet
        workbook = Workbook()
        excel_sheet = workbook.active
        
        # Loop through each page in the PDF
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            
            # Extract text from the page
            page_text = page.extract_text()
            
            # Add the extracted text to the Excel sheet
            excel_sheet.cell(row=page_num + 1, column=1, value=page_text)
    d1=excel_sheet['A1'].value
    d2=d1[:806].split()
    
    bank_data = {'name':d2[4]+d2[5]+d2[6],'account_no':d2[26],'ifsc_code':d2[58]}
    return bank_data