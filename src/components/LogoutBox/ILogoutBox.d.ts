export interface IAlertDialog {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
  loading: boolean;
}
