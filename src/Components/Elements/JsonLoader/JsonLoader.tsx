import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import generateUUID from '../../../Utils/GetUniqueIdentifier';
import { JsonLoaderPropsType } from './JsonLoaderPropsType';
import { JsonLoaderStateType } from './JsonLoaderStateType';
import { JsonParsedModel } from './JsonParsedModel';


const JsonLoader: React.FC<JsonLoaderPropsType> = ({sendDataToParent}) => {

    const [dropState, setDropState] = useState<JsonLoaderStateType>({
        isDropped: false,
        jsonData: []
    });


    const onDrop = useCallback((acceptedFiles: File[]) => {

        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const parsedData = JSON.parse(e.target?.result as string);
                console.log("data read from the json file", parsedData);
                
                
                const questionsCategories = parsedData["message"]["history"];
                let structuredData: JsonParsedModel[] = [];
                
                Object.keys(questionsCategories).map(key => {
                structuredData.push({
                    id: generateUUID()!,
                    categoryName: key,
                    quesionsAndAnswers: [...questionsCategories[key]]
                    });
                });

                console.log("data set as state of json loader and passed to the page of parser", structuredData);
                sendDataToParent(structuredData);
                setDropState({
                    isDropped: true,
                    jsonData: structuredData
                });
                
                //handleDataSend(dropState.jsonData);
            }

            reader.readAsText(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleDataSend = (data: JsonParsedModel[])=>{
        sendDataToParent(data);
    }
    
    return (
        <div>
            
            {!dropState.isDropped ? (<div {...getRootProps()} className="dropzone"
                        style={{
                            backgroundImage: "url('/upload-icon.png')",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize:'contain',
                            backgroundPosition:'center',
                            // border:'1px black solid',
                            height: '500px',
                            width: '100%'
                        }}
                    >
                        <input {...getInputProps()} />

                    </div>
                    ) : null
            }
            
            {/* {dropState.isDropped ? (<QuestionsParsers questionsParsedFromJson={dropState.jsonData} />) :
                    (<div {...getRootProps()} className="dropzone"
                        style={{
                            backgroundImage: "url('/upload-icon.png')",
                            backgroundRepeat: 'non-repeat',
                            backgroundSize: 'contain',
                            height: '200px',
                            width: '200px'
                        }}
                    >
                        <input {...getInputProps()} />

                    </div>
            )} */}
        </div>
    )

}

export default JsonLoader;