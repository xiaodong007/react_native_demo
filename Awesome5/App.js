import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';

import Calendar from 'react-native-calendar';
import moment from 'moment';
import ListCourses from './ListCourses';
import CourseDetail from './CourseDetail';

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f7f7f7',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    content: {
        height: 40,
        paddingHorizontal: 5,
        backgroundColor:'white',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            selectedDate: moment().format(),
            dataSource: ds.cloneWithRows(['2222','33333']),
            ds:ds,
            name: null,
            content:"尚未提交内容"
        };
    }

    //页面跳转
    _push() {
        let _this = this;
        const {navigator} = this.props;
        let scenes = {
            component: CourseDetail,
            params: {
                name: _this.state.name,
                selectedDate:_this.state.selectedDate,
                updateContent: (content)=> {
                    _this.setState({content: content});
                }
            }
        };
        navigator.push(scenes);
    }

    render() {
        return (
            <View style={styles.container}>
                <Calendar
                    ref="calendar"
                        eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30']}
                        events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
                        scrollEnabled
                        showControls
                        dayHeadings={customDayHeadings}
                        monthNames={customMonthNames}
                        titleFormat={'MMMM YYYY'}
                        prevButtonText={'Prev'}
                        nextButtonText={'Next'}
                        //onDateSelect={(date) => this.setState({ selectedDate: date })}
                        onDateSelect={this.onDaySelected.bind(this)}
                        onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
                        onTouchNext={(e) => console.log('onTouchNext: ', e)}
                        onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
                        onSwipeNext={(e) => console.log('onSwipeNext', e)}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <TouchableHighlight onPress={this._push.bind(this)}>
                            <View>
                                <Text>选中日期：{rowData}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                    />
                <Text style={styles.content}>内容：{this.state.content}</Text>
            </View>
        );
    }

    onDaySelected(day) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            selectedDate: day,
            dataSource: ds.cloneWithRows([day,day,day,day])
        })
    }
}

module.exports = App;

//<Text>Selected: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
//<Text>Selected: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
//    <ListCourses courses = {[this.state.selectedDate,this.state.selectedDate]}/>