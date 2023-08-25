export const isInsertBefore = (today, user) => {
  let getUserLocalInfo;
  if (localStorage.getItem("insertionOccurred") === null) {
    getUserLocalInfo = null;
  } else {
    getUserLocalInfo = JSON.parse(localStorage.getItem("insertionOccurred"));
  }
  // console.log(getUserLocalInfo);
  getUserLocalInfo == null || undefined
    ? (getUserLocalInfo = [])
    : getUserLocalInfo;

  let insertBefore = false;
  getUserLocalInfo.filter((e) => {
    if (e.id == user.id && today == e.present_date) {
      insertBefore = true;
    }
    //  return insertBefore;
  });
  return insertBefore;
};

export let addLocalStorage = (today,user) => {
  let localUser = [];
  let userLocalinfo = {
    id: user.id,
    present_date: today,
    insertOccurred: true,
  };
  localUser.push(userLocalinfo);
  localStorage.setItem("insertionOccurred", JSON.stringify(localUser));
};