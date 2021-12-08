var role_status = [[${user_role}]];

if(role_status === "ROLE_ADMIN")
{
    document.getElementById("role_vision").innerHTML = "Роль: Админ";
    document.getElementById("admin").style.display = "inline";

}
else if (role_status === "ROLE_USER")
{
    document.getElementById("role_vision").innerHTML = "Роль: Пользователь"
    document.getElementById("admin").style.display = "none";
}