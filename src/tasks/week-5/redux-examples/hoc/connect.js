import React from 'react';
import ReduxContext from '../contexts/ReduxContext.js'

const connect = (mapStateToProps, mapDispatchToProps) => Component => {

    class ConnectedComponet extends React.Component {

        static contextType = ReduxContext;

        constructor(props, context) {
            super(props);
            this.state = {
                data: mapStateToProps ? mapStateToProps(context.getState()) : {}
            }
            this.actions = mapDispatchToProps ? mapDispatchToProps(context.dispatch.bind(this.context)) : {}
        }

        componentDidMount() {
            this.unsubscribe = this.context.subscribe(() => {
                console.log('Update store');
                this.setState({
                    data: mapStateToProps ? mapStateToProps( this.context.getState() ) : {}
                })
            })
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            return (
                <Component {...this.props} {...this.state.data} {...this.actions} />
            )
        }
    }

    return ConnectedComponet;
}

export default connect;

