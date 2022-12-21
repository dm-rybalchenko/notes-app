function Button({ children, modClass, ...props }: any) {
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

export { Button };
