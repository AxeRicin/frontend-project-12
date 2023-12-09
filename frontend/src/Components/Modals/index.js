import AddChannel from './AddChannel.js';
// import RemoveChannel from './RemoveChannel.jsx';
// import RenameChannel from './RenameChannel.jsx';

const modals = {
  addChannel: <AddChannel />,
  // removeChannel: RemoveChannel,
  // renameChannel: RenameChannel,
};

export default (modalType) => modals[modalType];
