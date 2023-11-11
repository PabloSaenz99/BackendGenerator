# Backend Generator guide

This tool generates a file structure system for backend develeopment. Its better suited to work with Express, however it can work with other frameworks.

## Basic usage
Run the following command where you want to generate the structure:
```
npm generate-backend -n <filename> <option>
```

### Options
- Add default methods:
	- This option adds the default methods shown in [defaultMethods.txt](/src/files/defaultMethods.txt)
	    ```
        npm generate-backend -n <filename> -d
        ```
- Add default extended methods:
	- This option adds the default methods shown in [defaultExtendedMethods.txt](/src/files/defaultExtendedMethods.txt)
    	```
        npm generate-backend -n <filename> -e
        ```
- Add custom methods:
	- This option adds custom methods passed as parameter
	    ```
	    npm generate-backend -n <filename> -c <methods>
        ```
	- This option adds custom methods passed as file path
	    ```
	    npm generate-backend -n <filename> -f <file-path>
        ```
	- It is possible to combine `custom options` with `default options`:
		```
		node index.js -n myFile -e -f "customOptions.txt"
		```
	- Methods **must** follow the syntax:
	
        ```
        [
        	[['accessType1', 'endpoint1'], 'methodName1', 'methodParam1 <optional>'],
        	[['accessType2', 'endpoint2'], 'methodName2']
        ]
        ```
    - Example:
        ```
        npm generate-backend -n myFile -c [[['get', 'findTrue'], 'findTrue'], [['post', 'updateByEmail/:id'], 'updateByEmail','req.body']]
        ```
		```
        npm generate-backend -n myFile -f "./customMethodsFile.txt"
        ```
		### See also the [example]("./example") folder

### Considerations
If `custom` and `custom file` options are used, only custom option data will be used, ignoring the file.

If `default` and `default extended` options are used, only default option data will be used, ignoring the extended.

### View
The basic structure file is as follows:

    <main folder>
    	└ routes
    		└ myFile.route.js
    	└ controllers
    		└ myFile.controller.js
    	└ services
    		└ myFile.service.js
Also there is a [structure example](example/).