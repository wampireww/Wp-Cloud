import React from 'react'
import { pickMultiple,isCancel,types } from 'react-native-document-picker';

export const Documentpick=async(setdosyalar)=> {

    try {
        const results = await pickMultiple({
          type:types.allFiles,
          presentationStyle: 'fullScreen',
          copyTo: 'documentDirectory',
          //There can me more options as well find above
        })
        const results1 = results.map(item => ({
          ...item,
          fileCopyUri: `file://${decodeURIComponent(item.fileCopyUri)}`,
        }));
        setdosyalar(results1);
        }
          






        // for(i=0;i<results.length;i++){
        //   setdosyalar({ multipleFile: results});

        // }
     
        // for (const res of results) {
        //   //Printing the log realted to the file
        //   console.log('res : ' + JSON.stringify(res));
        //   console.log('URI : ' + res.uri);
        //   console.log('Type : ' + res.type);
        //   console.log('File Name : ' + res.name);
        //   console.log('File Size : ' + res.size);
        // }
        //Setting the state to show multiple file attributes
       // setdosyalar({ multipleFile: results});
        
       catch (err) {
        //Handling any exception (If any)
        if (isCancel(err)) {
          //If user canceled the document selection
          setdosyalar([]);
        } else {
          //For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
 
}

