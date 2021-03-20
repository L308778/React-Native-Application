import React, {createContext, useContext} from 'react'
import Images from '../components/images/image_loader.js';
import Data from "../components/data/main.json"
export const DataContext = createContext()

class DataContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            activities: Images,
            saved_activities: [],
            location: {
                latitude: "",
                longitude:""
            }
        };
    }

    saved = (index) => {
        this.setState({saved_activities: this.state.saved_activities.concat(Data[index])});
      };

    on_location = (loc) => {
        this.setState({location: loc})
    }

    render() {
        return (
            <DataContext.Provider value={{...this.state, save_activity: this.saved, change_location: this.on_location}}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

export default DataContextProvider;
