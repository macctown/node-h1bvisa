# node-h1bvisa
Node.js module for retrieving H1B visa information by company

### Warning
The code works, but no test case for now, will add it soon. So be careful when you use it.

### Install
```
npm install --save node-h1bvisa
```

### Usage
```javascript
//init
var h1b = require('node-h1bvisa');

h1b.findByTerms("google",
{
    city:"Seattle",
    year:"2015"
})
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.log(err);
}) 
```

### Test

```bash
Haven't add yet...This guy is very lazy and sleepy now
```

### Reference
- [H1b Information](http://h1bdata.info/index.php)

### TODO
- Add test cases
- Add insights function for analysis
- Make code fancy
- Add those fancy badges

### License
[MIT](http://spdx.org/licenses/MIT)
