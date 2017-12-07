import React from 'react';
import {Episode} from './Episode';
import * as Config from '../common/Config';
import Utility from '../common/Utility';
import s from '../../scss/main.scss';

export default class Series extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            episodes: []
        };
    }

    componentDidMount() {
        Utility.getData(Config.API_BASE_URI + '/index.php').then(jData => {
            if (jData.status == 1 && jData.data) {
                this.setState({
                    episodes: jData.data,
                    loaded: true
                });

                Utility.setupSlyScroll();
            }

        }).catch(ex => {

        });
    }

    render() {
        const episodes = this.state.episodes;
        const jsxEpisodes = episodes.map((eps, i) => {
            return <Episode key={i} {...eps} />;
        });

        return (
            <div id="slides_wrap_1" className="slide-wrap">
                { !this.state.loaded ? 'LOADING ...' : 
                    <div>
                        <div className="scrollbar">
                            <div className="handle">
                                <div className="mousearea"></div>
                            </div>
                        </div>

                        <div className="frame" id="slides_1">
                            <ul>{ jsxEpisodes }</ul> 
                        </div>

                        <div className="controls center">
                            <a className="btn prevPage"><span className="glyphicon glyphicon-chevron-left"></span></a>
                            <a className="btn nextPage"><span className="glyphicon glyphicon-chevron-right"></span></a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}