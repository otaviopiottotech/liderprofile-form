export interface modalActions<T extends object = any> {
  onClose?: () => void;
  onUpdate?: (data?: T) => void;
  data?: T;
  onSetEditedData?(val: boolean): void;
}
