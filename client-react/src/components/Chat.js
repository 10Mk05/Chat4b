import React from 'react';
import Header from '../components/Header.js';
import Section from '../components/Section.js';
import Contacts from '../components/Contacts.js';
import ChatContainer from '../components/ChatContainer.js';
import MessageInput from '../components/MessageInput.js';
import ContactInfo from '../components/ContactInfo.js';



class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
  render() {
    const { currentWindow, setCurrentWindow } = this.props;
    const { selectedSelection, setSelectedSelection } = this.props;
    const { selectedContact, setSelectedContact } = this.props;
    const { myUsername, setMyUsername } = this.props;
    return (
      <>
        <div>
          <Header currentWindow={currentWindow} setCurrentWindow={setCurrentWindow} />
        </div>
        <div>
          <Section currentSection={selectedSelection} setCurrentSection={setSelectedSelection} />
        </div>
        <div>
          <Contacts currentSection={selectedSelection} selectedContact={selectedContact} setSelectedContact={setSelectedContact} myUsername={myUsername} setMyUsername={setMyUsername} />
        </div>
        <div>
          <ChatContainer currentSection={selectedSelection} selectedContact={selectedContact} myUsername={myUsername} />
        </div>
        <div>
          <MessageInput currentSection={selectedSelection} selectedContact={selectedContact} myUsername={myUsername} />
        </div>
        <div>
          <ContactInfo currentSection={selectedSelection} selectedContact={selectedContact} myUsername={myUsername} />
        </div>
        </>
    );
  }
}

export default Chat;