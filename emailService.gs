function doPost(e) {
  const emailFields = JSON.parse(e.postData.contents)
  if (emailFields.subject && emailFields.body && emailFields.email) {
    GmailApp.sendEmail(emailFields.email, emailFields.subject, emailFields.body)
    return ContentService.createTextOutput(JSON.stringify({ "status": 200 }))
  } else {
    return ContentService.createTextOutput(JSON.stringify({ "status": 400 }))
  }
}
