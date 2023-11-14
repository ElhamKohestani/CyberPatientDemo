

type TabContent ={
    tabName: string,
    tabContent: JSX.Element
}


export type TabPropsType = {
    defaultActiveTab: number,
    tabs: TabContent[]
    //handleTabClick(): void 
}


