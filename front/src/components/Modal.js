import React from 'react';
import { Modal } from 'semantic-ui-react';

const TrelloModal = ({close, header, content, buttons}) => {
  return (
    <Modal
      open={true}
      onClose={() => close()}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content >
        {content}
      </Modal.Content>
      <Modal.Actions>
        {buttons}
      </Modal.Actions>
    </Modal>
  )
};

export default TrelloModal;