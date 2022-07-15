import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React,{Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = {
            'up'    : "arrow-up" ,
            'down'  :"arrow-down"
        };

        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value(0),
            minHeight   : 0,
            maxHeight   : 0,
            maxValueSet : false,
            minValueSet : false,
            cardHeight  : 'auto'
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState((prevState) => ({
            expanded: !prevState.expanded
        }));

        Animated.spring(this.state.animation, {
            toValue: finalValue,
            useNativeDriver: true
        }).start();
    }

    _setMaxHeight(event){
        if(!this.state.maxValueSet) {
            this.setState({
                maxHeight   : event.nativeEvent.layout.height,
                maxValueSet : true
            });
        }
    }

    _setMinHeight(event){
        if(!this.state.minValueSet) {
            this.state.animation.setValue(event.nativeEvent.layout.height);

            this.setState({
                minHeight   : event.nativeEvent.layout.height,
                minValueSet : true
            });
        }
    }

    componentDidMount() {
        this.animationId = this.state.animation.addListener(({value}) => {
            this.setState({
                cardHeight: value
            });
        });
    }

    componentWillUnmount() {
        this.state.animation.removeListener(this.animationId);
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View 
                style={[styles.container, {height: this.state.cardHeight}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Image style={styles.icon} source={require('../assets/images/' + "house" + '.png')} />
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <MaterialCommunityIcons
                            name={icon}
                            size={25}
                        ></MaterialCommunityIcons>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    <Text>{this.props.bed} bed/{this.props.bath}ba  {this.props.sqft} sqft | {this.props.type}</Text>
                    <Text>${this.props.value}</Text>
                    <Text>{this.props.description}</Text>
                    <Text>Income Generated: ${this.props.generated}</Text>
                    <Text>Vacant: {this.props.vacant}</Text>
                    <Text>Next Due Date: {this.props.due}</Text>
                    <Text>Tenants: </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight 
                            style={styles.button}
                            onPress={this.props.onPress}
                            underlayColor="#f1f1f1">
                            <Text style={styles.buttonText}>View Property</Text>
                        </TouchableHighlight>
                    </View>
                    <MaterialCommunityIcons name="trash-can-outline" size={25} />
                </View>
            </Animated.View>
        );
    }
              
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin:5,
        overflow:'hidden',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#eaeaea'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 10,
        fontWeight:'300'
    },
    button: {
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        padding: 10,
        paddingTop: 0
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    icon: {
        margin: 10,
        borderRadius: 10,
        width: 80,
        height: 80
    }

});

export default Panel;