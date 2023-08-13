


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
    