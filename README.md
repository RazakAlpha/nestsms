
# Nest Sms

Nest sms is library for sending sms and interacting with nest bulk messaging api.
It's a nodejs wrapper that makes it easier for developers to integrate sms messaging into their nodejs apps.
You will need an developer account to use the module. you can signup for an account at https://sms.nestitservices.com/account/register



## Usage/Examples
### Initialising with api key
```javascript
const nestsms = require('nestsms')

nestsms.init(
  {host: 'https://api.sms.nestitservices.com', 
  version: 'v4', 
  resources: '/messages/send', 
  authModel: {type: 'key', key: '...APIKEY...'} 
})

```

### Initialising with factor i.e. portal username and password
```javascript
const nestsms = require('nestsms')

nestsms.init(
  {host: 'https://api.sms.nestitservices.com', 
  version: 'v4', 
  resources: '/messages/send', 
  authModel: {type: 'factor', username: '...', password: '...'} 
})

```

### SEND MESSAGE
```javascript

 nestsms.quickSend(
     {
         From:'Test MIS', 
         To: 233xxxxxxxxxx, 
         Content: 'Testing unisms', 
         Type: 0})
         .then(response => {
             // HANDLE RESPONE
            console.log(response)
            }).catch(err => {
                // HANDLE ERROR
                console.error(err)
            })

```

### SEND PERSONALIZED MESSAGE
```javascript

 nestsms.quickSend(
     {
         From:'SenderID', 
         Content: 'Hello {$name}, your account balance is {$balance}', 
         To: {to: 233xxxxxxxxx, values: ['Alpha', 25000]}, // [{to: 233xxxxxxxxx, values: ['Alpha', 25000]}, {to: 223xxxxxxxxx, values: ['James', 1200]}]
         Type: 0})
         .then(response => {
             // HANDLE RESPONE
            console.log(response)
            }).catch(err => {
                // HANDLE ERROR
                console.error(err)
            })

```
Note: An error is thrown if the number of personalization slots in the message ({$}) in not equal to the number of values provided for the destinations or To values.


## supported bulk sms gateways
nestsms --> sms.nestitservices.com
smsonlinegh --> smsonlinegh.com




## Roadmap

- Additional browser support

- Add more functions such as sending personalised sms, checking account balance, etc


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@RazakAlpah](https://github.com/RazakAlpha)

