function getStoreInstance(user) {
  const storeName = user.email.replace("@", "").replace(".", "");
  const storeInstance = localforage.createInstance({
    name: `User_${storeName}`,
    storeName,
    description: `Data for ${user.email}`,
  });
  return storeInstance;
}
