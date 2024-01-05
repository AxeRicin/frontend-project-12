import AddChannel from './AddChannel.js';
import RemoveChannel from './RemoveChannel.js';
import RenameChannel from './RenameChannel.js';

const modals = {
  addChannel: <AddChannel />,
  removeChannel: <RemoveChannel />,
  renameChannel: <RenameChannel />,
};

export default (modalType) => modals[modalType];
