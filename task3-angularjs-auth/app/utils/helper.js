function getStoreInstance(user) {
  const storeName = user.email.replace("@", "").replace(".", "");
  const storeInstance = localforage.createInstance({
    name: `Users`,
    storeName,
    description: `Data for ${user.email}`,
  });
  return storeInstance;
}
