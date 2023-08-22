from datetime import timedelta

def Calculate_EMI(Loan_amount=None,Tenure=None,Interest_rate=None):
    try:
        tenure_months = Tenure * 12
        monthly_interest_rate = Interest_rate / (12 * 100)
        EMI_amount = (Loan_amount * monthly_interest_rate * (1 + monthly_interest_rate)**tenure_months) / ((1 + monthly_interest_rate)**tenure_months - 1)
        return EMI_amount
    
    except:
        return 'Invalid information'
    
def calculate_emi_schedule(EMI_amount=None,Loan_disbursement_date=None,Tenure=None):
    
    try:
        emi_schedule = []
        tenure_months = int(Tenure * 12)
        EMI_date = Loan_disbursement_date+timedelta(days=30)
        for i in range(1,tenure_months+1):
            
            emi_schedule.append({
                "installment_number" : i,
                "emi_amount": EMI_amount,
                "expected_date": EMI_date,
            })
            i += 1  # Assuming monthly installments
            EMI_date = EMI_date+timedelta(days=30)
        return emi_schedule
    except:
        return 'Invalid data'