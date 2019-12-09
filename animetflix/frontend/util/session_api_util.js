
export const signup = (userForm) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: {user: userForm}
    });
}

export const login = (userForm) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: {user: userForm}
    });
};

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session"
    });
};