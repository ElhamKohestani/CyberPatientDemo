import React, {useState} from 'react'
import { TabPropsType } from './TabPropsType';
import { tabContainer, tabSelectedStyle, tabStyles } from './styles';


const  Tab : React.FC<TabPropsType> = ({defaultActiveTab, tabs}) => {

    const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
    
    const handleTabClick =  (e: React.MouseEvent<HTMLButtonElement>) =>{
        const buttonId = (e.target as HTMLButtonElement).id;

        const match = buttonId.match(/(\d+)$/);
        console.log(match);
        const activeIndex: number = parseInt(match![0]) ;

        setActiveTab(activeIndex);
    }

  return (
    <>
        <div style={tabContainer}>
            {tabs.map((t, index) => {
                return (
                <button style={index == activeTab ? tabSelectedStyle : tabStyles} id={`CyberTabIndex-${index}`} onClick={handleTabClick} key={index}>
                    {t.tabName}
                </button>
                )
            })}
        </div>
        <div>
            {tabs[activeTab].tabContent}
        </div>
    </>
  )
}
export default Tab;
