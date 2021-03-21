import React, {createContext, useContext} from 'react'
import Images from '../components/images/image_loader.js';
import Data from "../components/data/main.json"
export const DataContext = createContext()

class DataContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            data : Data,
            activities: Images,
            saved_activities: [],
            location: {
                latitude: "",
                longitude:""
            },
            curr_activity : {},
        };
    }

    saved = (index) => {
        this.setState({saved_activities: this.state.saved_activities.concat(Data[index])});
      };

    on_location = (loc) => {
        this.setState({location: loc})
    }

    for_info = (index) => {
        this.setState({curr_activity: {image: Images[index], data: Data[index]}})
    }

    render() {
        return (
            <DataContext.Provider value={{...this.state, 
            save_activity: this.saved, 
            change_location: this.on_location,
            for_info : this.for_info }}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

export default DataContextProvider;
