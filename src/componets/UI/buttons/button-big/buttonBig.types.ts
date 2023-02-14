export interface IButtonBigProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  modClass?: string;
  type?: 'submit';
}
