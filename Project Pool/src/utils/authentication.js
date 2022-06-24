export const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    return token ? JSON.parse(token) : undefined;
}

export const setAccessToken = (token) => {
    return localStorage.setItem("accessToken", JSON.stringify(token));
}

export const setUserDetails = (user) => {
    return localStorage.setItem("userDetails", JSON.stringify(user));
}


export const getUserDetails = () => {
    return JSON.parse(localStorage.getItem("userDetails"));
}

export const getUserRole = () => {
    const userDetails = getUserDetails();
    return userDetails.role;
}

export const isUser = () => {
    const userDetails = getUserDetails();
    return userDetails.role === "user";
}

export const isAdmin = () => {
    const userDetails = getUserDetails();
    return userDetails.role === "admin";
}

export const getUserName = () => {
    const userDetails = getUserDetails();
    const {firstName, lastName} = userDetails || {};
    return `${firstName} ${lastName}`;
}


export const getUserNameWithoutSpace = () => {
    const userDetails = getUserDetails();
    const {firstName, lastName} = userDetails || {};
    return `${firstName}_${lastName}`;
}

export const isLoggedIn = () => {
    return Boolean(getAccessToken());
}

export const removeUnderscore = (name) => {
    return name.split("_").join(" ");
}