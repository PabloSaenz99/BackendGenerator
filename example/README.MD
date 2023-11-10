# Use example
## Default options
- Run with default option:
```
node index.js -n myExample -c
```
- Run with default extended option:
```
node index.js -n myExample -d
```

## Custom options
- Run with custom option:
```
node index.js -n myExample -c "[[['get','findTrue'],'findTrue'],[['post','updateByEmail/:id'],'updateByEmail', 'req.body']]" --debug
```
- Run with custom file option:
```
 node index.js -n myExample -f "./customOptions.txt" --debug
```
For complex JSONs it is recommended using the file version as it will be easier discard parse errors

## Example
To generate this folder, the folowwing commands have been executed:
```
node index.js -n message -e
node index.js -n user -e -f "customOptions.txt"
```