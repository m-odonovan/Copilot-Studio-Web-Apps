import { Components, createDirectLineSpeechAdapters, createCognitiveServicesSpeechServicesPonyfillFactory } from 'botframework-webchat';
import { createDirectLine } from 'botframework-webchat';
import React, { useEffect, useState, Component } from 'react';

import {
  region as fetchSpeechServicesRegion,
  token as fetchSpeechServicesToken
} from './fetchSpeechToken';
import SmartDisplay from './SmartDisplay';

const { Composer } = Components;

//add your URL to Direct Link URL for your bot
const CopilotStudioDirectLineURL = 'https://.../directline/token?api-version=2022-03-01-preview';
const selectVoice = () => ({ voiceURI: 'en-US-AvaMultilingualNeural' }); ////en-ZA-LeahNeural, en-US-AvaMultilingualNeural (non Open AI), en-US-AlloyMultilingualNeural (openai)

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directLine: null,
      webSpeechPonyfillFactory:null
    };
  }



  async componentDidMount() {
    
    const res = await fetch(CopilotStudioDirectLineURL, { method: 'GET' });
    const { token } = await res.json();
    const webSpeechPonyfillFactory = await createCognitiveServicesSpeechServicesPonyfillFactory({
      credentials: {
        authorizationToken: await fetchSpeechServicesToken(),
        region: await fetchSpeechServicesRegion()
      }
    });

    this.setState(() => ({
      directLine: createDirectLine({domain:'https://europe.directline.botframework.com/v3/directline',token}),
      webSpeechPonyfillFactory
    }));
  }

  
  render() {
    const {
      state: { directLine,webSpeechPonyfillFactory}
    } = this;

 

    return (
     
      !!directLine &&
      !!webSpeechPonyfillFactory && (
        <Composer directLine={directLine} webSpeechPonyfillFactory={webSpeechPonyfillFactory} selectVoice={selectVoice}>
          <div className="App">
            <header className="App-header">
            <SmartDisplay />
            </header>
          </div>
        </Composer>
          )
    );
  }
}
