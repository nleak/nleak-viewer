# nleak-viewer
 
An automatical memory detection and diagnosis tool for NodeJS.
 
## Background
 
- `src` folder contains all src code for `nleak-viewer`
    <!-- + NodeJS driver
    + Heap analysis
    + Leak detection & debugging algorithms
    + Reporter
    + ... -->
- `public` folder contains required html files for formatting 
    + Frontend structure format logic
    + ...

 
## Development
 
### Local Development
- `npm i`
- `npm run dev`
 
The `dev` script will start `nodemon` to monitor all TypeScript changes and compile
them into JavaScript and put to `build` folder.
 
For local testing, currently we support driver tests. Simply run `npm run test:driver`.
## How to use NLeak-Viewer
 
NLeak viewer is a tool built in reactjs that allows you to visualize the heap snapshot growth of your application. To use it, simply go to https://nleak-viewer.vercel.app/ and upload your nleak_result.json file.
 
Once you've uploaded the file, NLeak viewer will generate a chart showing the growth of your heap snapshots over time. You'll also see a summary of the last heap snapshot's size, as well as the leak location with source map.
 
By using NLeak with the viewer, you can easily identify potential memory leaks in your application and take steps to fix them.
 
<img width="1783" alt="Screen Shot 2022-12-04 at 11 32 36 AM" src="https://user-images.githubusercontent.com/5697641/205511402-d2bd3457-5b62-4085-84b4-9f4a486d1dcf.png">
 
## Acknowledgement
 
 

