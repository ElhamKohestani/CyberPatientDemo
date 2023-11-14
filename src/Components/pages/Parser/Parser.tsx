import React, { useEffect, useState, ChangeEvent } from 'react';
import ListGroup from '../../Elements/ListGroup/ListGroup';
import ListElement from '../../Elements/List/List';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CanvasPlaceHolder from '../../../svgs/CanvasPlaceHolder';
import UploadAssetLable from '../../Elements/UploadAssetLable/UploadAssetLable';
import SearchBox from '../../Elements/SearchBox/SearchBox';
import GeneralQuestionsMockData from '../../../Utils/GeneralQuestionsMockData';
import { JsonParsedModel, QuestionAndAnswerModel } from '../../Elements/JsonLoader/JsonParsedModel';
import GeneralQuestionsType from './GeneralQuestionsType';
import JsonLoader from '../../Elements/JsonLoader/JsonLoader';
import { containerDiv, scrollableDiv, colStyles } from './styles';
import Button from '../../Elements/Button/Button';
import Tab from '../../Elements/Tab/Tab';

const Parser: React.FC = () => {
  // set the state for Parsed Questions
  const [stateData, setStateData] = useState<JsonParsedModel[]>([]);


  // set the stated for General Questions
  const [generalQuestions, setGeneralQuestions] = useState<GeneralQuestionsType[]>([...GeneralQuestionsMockData]);
  const [selectedGeneralQuestions, setSelectedGeneralQuestions] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (generalQuestionId: string) => {
    setSelectedGeneralQuestions((prevSelectedGeneralQuestion) => ({
      ...prevSelectedGeneralQuestion,
      [generalQuestionId]: !prevSelectedGeneralQuestion[generalQuestionId],
    }));
  };
  

  const handleDragDrop = (result: any) => {

    console.log("component state data", stateData);
    console.log("drag result", result);
    const { source, destination, type } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (source.droppableId != "generalQuestions") {

      const itemSourceIndex = source.index;
      const itemDestinationIndex = destination.index;

      const categorySourceIndex = stateData.findIndex(
        (category) => category.id === source.droppableId
      );
      const categoryDestinationIndex = stateData.findIndex(
        (category) => category.id === destination.droppableId
      );

      const newSourceItems = [...stateData[categorySourceIndex].quesionsAndAnswers];


      const newDestinationItems =
        source.droppableId !== destination.droppableId
          ? [...stateData[categoryDestinationIndex].quesionsAndAnswers]
          : newSourceItems;



      const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
      newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

      const newStateData = [...stateData];

      newStateData[categorySourceIndex] = {
        ...stateData[categorySourceIndex],
        quesionsAndAnswers: newSourceItems,
      };
      newStateData[categoryDestinationIndex] = {
        ...stateData[categoryDestinationIndex],
        quesionsAndAnswers: newDestinationItems,
      };

      return setStateData(newStateData);

    }

    else if (source.droppableId === "generalQuestions") {
      console.log("dragged from generalQuestions");

      if (!result.destination) {
        return;
      }
      
      // remove and reorder the source data
      const reorderedItems = [...generalQuestions];
      const [movedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, movedItem);

      // if we are dragging and dropping from general questions to general questions
      if(destination.droppableId === "generalQuestions"){
        setGeneralQuestions(reorderedItems);
      }


      // if dragging from general questions to json parsed questions
      else if (destination.droppableId != "generalQuestions") {
        console.log("Here insert the dragged question to the specific array");
               
        const categoryDestinationIndex = stateData.findIndex(
          (category) => category.id === destination.droppableId
        );

        const newDestinationItems = [...stateData[categoryDestinationIndex].quesionsAndAnswers];

        newDestinationItems.splice(destination.index, 0, {"identifier": generalQuestions[source.index].identifier, "Q": generalQuestions[source.index].Q, "A": "", "score": 1});

        const newStateData = [...stateData];

        newStateData[categoryDestinationIndex] = {
          ...stateData[categoryDestinationIndex],
          quesionsAndAnswers: newDestinationItems,
        };

      return setStateData(newStateData);
      }
    }
  }
  
  useEffect(() => {
    console.log("Rendered: parsed questions inside the stateData is", stateData);
  }, [stateData, generalQuestions]);
  
  const receiveDataFromLoader = (data: JsonParsedModel[]) => {
    console.log("data received from loader", data);
    setStateData(data);
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, e.target.value.length);
    if (e.target.value.length == 0) {
      setGeneralQuestions([...GeneralQuestionsMockData]);
    }
    else {
      let filtered = generalQuestions.filter(q => q.Q.includes(e.target.value));
      setGeneralQuestions(filtered)

    }

  };


  const debounce = <T extends Function> (func: T, dealy: number) =>{
    let timeout: NodeJS.Timeout;
    return function(this: any, ...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), dealy);
    };
  }

  return (


    <Container>


      {stateData.length == 0 ?
        (<><Row>
          <Col xs={3} md={3} lg={3}>
        </Col>
          <Col md={6}>
            
            <JsonLoader sendDataToParent={receiveDataFromLoader} />
            
          </Col>
          <Col md={3}>
          </Col></Row></>) :
        <>
          <Row>
            <Col md={3}>
              <Row>
                <Col md={6} style={colStyles}>
                  <Button Text='Edit Mode' />
                </Col>
                <Col md={6} style={colStyles}>
                  <Button Text='Preview Mode' />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <DragDropContext onDragEnd={handleDragDrop}>

              <Col xs={12} md={3} lg={3} xl={3} style={colStyles}>
                <div style={{ ...containerDiv, ...scrollableDiv }}>
                  {stateData.map((questionCategory, index) => (
                    <div>
                      <ListGroup
                        key={questionCategory.id}
                        groupText={questionCategory.categoryName} />

                      <Droppable droppableId={questionCategory.id} type="questions">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>

                            {questionCategory.quesionsAndAnswers.map((qa: QuestionAndAnswerModel, index: any) => (
                              <Draggable draggableId={qa["identifier"]} index={index} key={qa["identifier"]}>
                                {(provided) => (
                                  <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                    <ListElement
                                      key={qa["identifier"]}
                                      MainText={qa["Q"]}
                                      SubText={qa["A"]}
                                      Score={qa["score"]} />
                                  </div>

                                )
                                }
                              </Draggable>
                            ))
                            }
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                    </div>
                  ))}

                </div>

              </Col>
              <Col xs={12} md={6} lg={6} style={colStyles}>
                <div style={containerDiv}>
                  <div style={{ textAlign: "center", marginTop:"110px" }}>
                    <CanvasPlaceHolder width={"270"} height={"300"} />
                    <UploadAssetLable />
                  </div>
                </div>
              </Col>
              <Col xs={12} md={3} lg={3} style={colStyles}>
                <div style={containerDiv}>

                  <Tab 
                    tabs={[{ tabName: "Global Questions", tabContent: (<>

                          <SearchBox handleInputChange={handleInputChange} />
                          <ListGroup groupText={"General Questions"} addIcon={false} />
                          <Droppable droppableId="generalQuestions" type="questions">
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps}>
                                {generalQuestions.map((question, index) => (
                                  <Draggable
                                    key={question.identifier}
                                    draggableId={question.identifier}
                                    index={index}
                                    isDragDisabled={!selectedGeneralQuestions[question.identifier]}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <input
                                          style={{
                                            border: 'none',
                                            outline: 'none',
                                            marginRight: '4px'
                                          }}
                                          type="checkbox"
                                          checked={selectedGeneralQuestions[question.identifier]}
                                          onChange={() => handleCheckboxChange(question.identifier)}
                                        />
                                        <li style={{ display: "inline", fontSize:"0.8rem" }}>
                                          {question.Q}
                                        </li>

                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                    
                    </>) }, 
                    
                    
                    { tabName: "Upload", tabContent: (<JsonLoader sendDataToParent={receiveDataFromLoader} />) }]}
                    
                    defaultActiveTab={0}
                  />

                  
                </div>
              </Col>
            </DragDropContext>
          </Row>
        </>
      }

    </Container>
  );
}

export default Parser;