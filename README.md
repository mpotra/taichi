# taichi

Template engine

## EXAMPLE

Piping a template file to taichi and then to stdout.
```javascript
var fs = require('fs');
var file1 = fs.createReadStream('[path to template file]');
file1.pipe(taichi.from('jade').to('html')).pipe(process.stdout);
```

## Current status (dev 0.0.1)
Currently just passing data through, until binding parser and compiler libs.