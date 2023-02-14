export interface ILoadingContext {
  lazyLoading: boolean;
  setLazyLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModal {
  coords: {
    x: number;
    y: number;
  };
  title: string;
  body: string;
  callback: () => Promise<void> | void;
}

export interface IModalContext {
  modal: null | IModal;
  setModal: React.Dispatch<React.SetStateAction<null | IModal>>;
}
