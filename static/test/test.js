
    // Переменные с массивами линейных и круговых диаграмм с сервера
    var stp13m_array_linear = [[${stp13m_month_linear}]]
    var stp13m_array_round = [[${stp13m_month_round}]]

    const linearDiagram = [stp13m_array_linear, navigator_2_golova_1_array_linear,
    navigator_2_golova_2_array_linear, navigator_3_array_linear, trulaser_array_linear,
    kometa_1_array_linear, kometa_2_array_linear, kometa_3_array_linear, ar55_array_linear];

    const roundDiagram = [stp13m_array_round, navigator_2_golova_1_array_round, navigator_2_golova_2_array_round,
    navigator_3_array_round, trulaser_array_round, kometa_1_array_round,
    kometa_2_array_round, kometa_3_array_round, ar55_array_round];



    $("button").click(function() { // свечение при наведении на место
        console.log("aaaaa");
    });
    $("button").hover(function() { // свечение при наведении на место
        console.log("aaaaa");
    });