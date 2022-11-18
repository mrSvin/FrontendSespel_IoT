function userControl() {
    return (
        <div style="display: flex; justify-content: center;">
            <table id="table_users">
                <thead>
                <tr className="tr-sticky">
                    <th>ID</th>
                    <th>Логин</th>
                    <th>Пароль</th>
                    <th>Права доступа</th>
                    <th>Активность</th>
                    <th>Электронная почта</th>
                    <th>Фото</th>
                </tr>
                </thead>
                <tbody style="margin-top: 100px">
                </tbody>
            </table>
            <!--Таблица изменений-->
        </div>
    )
}