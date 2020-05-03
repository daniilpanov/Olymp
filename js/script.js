/// ЭТОТ СКРИПТ АДАПТИРУЕТ СЕКЦИЮ 'BREED-FEATURES' К УСТРОЙСТВАМ С МАЛЕНЬКИМ ЭКРАНОМ (min-width: 390px)
/// Он пропорционально сдвигает "особенности породы", чтобы они не "улетали" с круга

// Функция для получения HTML-элемента, содержащего "особенность породы"
function elem(item) {
    return document.getElementsByClassName("breed-features__item--" + item)[0];
}

// Получаем "особенности"
var coh = elem("cohabitation"),
    ins = elem("instruction"),
    wt = elem("weight"),
    app = elem("appearance");
// Вычисляем коэфициенты сдвига
// Обратите внимание: в i_prop и w_prop коэфициент обратной пропорциональности
var c_prop = [-265 / 715, -290 / 615, -290 / 615],
    i_prop = [-275 * 715, -215 * 615, -180 * 465],
    w_prop = [-240 * 715, -165 * 615, -140 * 615],
    a_prop = [-250 / 715, -300 / 615, -300 / 615],
    i; // переменная, использующаяся как ключ массива

// Сам процесс сдвига
function shift() {
    if (window.innerWidth <= 715) {
        // Выбираем нужный ключ массива
        if (window.innerWidth <= 465) {
            i = 2;
        } else if (window.innerWidth <= 615) {
            i = 1;
        } else {
            i = 0;
        }
        // И сдвигаем элементы
        coh.style.left = (c_prop[i] * window.innerWidth).toString() + "px";
        ins.style.right = (i_prop[i] / window.innerWidth).toString() + "px";
        wt.style.right = (w_prop[i] / window.innerWidth).toString() + "px";
        app.style.left = (a_prop[i] * window.innerWidth).toString() + "px";
    } else {
        // Если не нужно ничего сдвигать - обнуляем позицию,
        // и возвращаем элементам изначальные стили
        coh.style.left = "";
        ins.style.right = "";
        wt.style.right = "";
        app.style.left = "";
    }
}

// Вызываем функцию сдвига
shift();
// Вызываем её при любом изменении размера окна браузера
window.onresize = shift;
