const generateKey = (length: number): string => {
  let key = '';

  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*_$';

  for (let i = 0; i < length; i++)
    key += possible.charAt(Math.floor(Math.random() * possible.length));

  return key;
};

export default generateKey;
