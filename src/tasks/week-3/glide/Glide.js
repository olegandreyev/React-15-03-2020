import React, { Component } from 'react'
import GlideJs from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import "@glidejs/glide/dist/css/glide.theme.min.css";

export default class Glide extends Component {

    constructor(props) {
        super(props);
        this.slider = React.createRef();
        this.glider = null;
    }

    static defaultProps = {
        bullets: true
    }

    componentDidMount() {
        this.glider = new GlideJs(this.slider.current, this.props.options).mount()
    }

    componentDidUpdate(prevProps) {
        if(this.props.options !== prevProps.options) {
            this.glider.update(this.props.options)
        }
    }

    componentWillUnmount() {
        this.glider.destroy()
    }

    render() {
        const { children, bullets } = this.props;
        return (
            <div ref={this.slider} className="glide">
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {children.map(img =>  <li className="glide__slide">{img}</li>)}
                    </ul>
                </div>
                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                </div>
                {bullets &&
                <div className="glide__bullets" data-glide-el="controls[nav]">
                {children.map((_, i) => <button className="glide__bullet" data-glide-dir={`=${i}`}></button> )}
                </div>
                }
            </div>
        )
    }
}
