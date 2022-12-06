function Button({ head, children, onClick }: IButtonProps) {
	
  return (
    <div className={head ? 'header__add' : 'edit-note__down'}>
      <button
        onClick={onClick}
        className={'button ' + (head ? 'header__btn' : 'edit-note__save')}
      >
        {children}
      </button>
    </div>
  );
}

export { Button };
