# Google Apps Script Email Service
A simple script that enables email sending via AJAX

This script is designed to be deployed as a web app on Google Cloud. It enables
a free way for frontend clients to send email using HTTP requests and AJAX.
Google Apps Scripts deployed on Google Cloud are subject to the following
[quotas](https://developers.google.com/apps-script/guides/services/quotas).

For a mostly free (and much more powerful) alternative, check out
[Mailgun](https://www.mailgun.com/). 

### Configure
Google App Script .gs files are written in Javascript. Thus, tweaks to this
script can be made to suit an application's particular needs. For more
information on Google Apps Scripts check out the 
[docs](https://developers.google.com/apps-script/overview).

### Deploy
To deploy, check out the 
[docs](https://developers.google.com/apps-script/guides/web#warning) on how to
deploy an Apps Script as a web app. The script will run on the Google Account
it is setup on. This means that if you setup the script on example@gmail.com,
recipients of all emails sent using the script will see the emails come from 
example@gmail.com.

### Use
Simply issue a `POST` to the URI provided by Google when you deployed your app. 
Include a JSON containing the fields `email`, `subject`, and `body`. 
For example:
```json
{
  "email": "example@mail.com",
  "subject": "Hello There",
  "body": "I hope you're doing well!"
}
```
Fields:

| Field      | Type | Description |
| ----------- | ----------- | ----------- |
| email | string | Email recipient |
| subject | string | Subject of the email |
| body | string | Body of the email |

The script will abort sending of an email if one of these fields is missing.
The script does not validate emails it is fed. Attempting to send mail to an
invalid email will count towards your quota and result in a bounced email
in the inbox of the Google Account the script is deployed on. 

There is currently no way to return custom status codes using Google App Script
so every response returned will have a status code of `200`. In order to support
some form of error handling, the script will respond with a JSON containing a
status the HTTP status code. For example:
```json
{
  "status": 400
}
```

Here is an example of proper usage of the script using fetch
```javascript
const sendEmail = async () => {
  const settings = { 
    method: 'POST',
    body: JSON.stringify({
      email: 'example@gmail.com',
      subject: 'Hello There',
      body: 'I hope you are doing well!'
    })
  }
  await fetch('google-apps-url.com', settings)
}
```
