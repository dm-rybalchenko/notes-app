function Button({ children, onClick, modClass }: IButtonProps) {
	
  return (
      <button
        onClick={onClick}
        className={'button ' + modClass}
      >
        {children}
      </button>
  );
}

export { Button };
