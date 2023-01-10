function Button({ children, modClass, ...props }: IButtonProps) {
  const rootClasses = ['button'];

  if (modClass) {
    rootClasses.push(modClass);
  }

  return (
    <button {...props} className={rootClasses.join(' ')}>
      {children}
    </button>
  );
}

export default Button;
