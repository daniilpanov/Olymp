// Не знаю, можно ли было реализовать это в css, но... теперь это уже не важно))
// Итак, этот скрипт предназначем для того, чтобы при переполнении контента элементов класса breed-features__item,
// эти эдементы не сдвигались. Они не расширяются, расширяются пустые элементы с теми же свойствами, что и у них
function main() {
    // Поскольку у пустых элементов те же классы, получаем всё сразу
    var cohabitation = document.getElementsByClassName("breed-features__item--cohabitation"),
        instruction = document.getElementsByClassName("breed-features__item--instruction"),
        weight = document.getElementsByClassName("breed-features__item--weight"),
        appearance = document.getElementsByClassName("breed-features__item--appearance");

    // Нужно измерить, сколько пространства будет занимать текст
    cohabitation[1].style.width = "auto";
    instruction[1].style.width = "auto";
    weight[1].style.width = "auto";
    appearance[1].style.width = "auto";

    cohabitation[1].innerHTML = cohabitation[0].innerHTML;
    instruction[1].innerHTML = instruction[0].innerHTML;
    weight[1].innerHTML = weight[0].innerHTML;
    appearance[1].innerHTML = appearance[0].innerHTML;

    // записываем результаты...
    var cohabitation_addition_height = cohabitation[1].clientHeight - cohabitation[0].clientHeight,
        instruction_addition_height = instruction[1].clientHeight - instruction[0].clientHeight,
        weight_addition_height = weight[1].clientHeight - weight[0].clientHeight,
        appearance_addition_height = appearance[1].clientHeight - appearance[0].clientHeight;

    // Далее возвращаемся к исходному виду пустых элементов
    cohabitation[1].innerHTML = "";
    instruction[1].innerHTML = "";
    weight[1].innerHTML = "";
    appearance[1].innerHTML = "";

    // и добавляем необходимые стили, чтобы текст, выходящий за пределы предшествующих блоков, был "на" пустых блоках.
    // Таким образом кажется, что увеличиваются блоки, в которых содержится текст,
    // но на самом деле увеличмваются эти, а не те
    // Ширина...
    cohabitation[1].style.maxWidth
        = cohabitation[1].style.width
        = (cohabitation[0].clientWidth + 20).toString() + "px";
    instruction[1].style.maxWidth
        = instruction[1].style.width
        = (instruction[0].clientWidth + 20).toString() + "px";
    weight[1].style.maxWidth
        = weight[1].style.width
        = (weight[0].clientWidth + 20).toString() + "px";
    appearance[1].style.maxWidth
        = appearance[1].style.width
        = (appearance[0].clientWidth + 20).toString() + "px";
    // Высота...
    cohabitation[1].style.height = cohabitation_addition_height.toString() + "px";
    instruction[1].style.height = instruction_addition_height.toString() + "px";
    weight[1].style.height = weight_addition_height.toString() + "px";
    appearance[1].style.height = appearance_addition_height.toString() + "px";
    // Позиция...
    cohabitation[1].style.top = (cohabitation[0].offsetTop + cohabitation[0].clientHeight).toString() + "px";
    instruction[1].style.top = (instruction[0].offsetTop + instruction[0].clientHeight).toString() + "px";
    weight[1].style.top = (weight[0].offsetTop + weight[0].clientHeight).toString() + "px";
    appearance[1].style.top = (appearance[0].offsetTop + appearance[0].clientHeight).toString() + "px";

    cohabitation[1].style.left = (cohabitation[0].offsetLeft - 10).toString() + "px";
    instruction[1].style.left = (instruction[0].offsetLeft - 10).toString() + "px";
    weight[1].style.left = (weight[0].offsetLeft - 10).toString() + "px";
    appearance[1].style.left = (appearance[0].offsetLeft - 10).toString() + "px";

    // Нужно, чтобы :hover срабатывал на элементах (пустом и с текстом) синхронно
    cohabitation[0].addEventListener('mouseover', function () {
        cohabitation[1].className += " active";
    });
    cohabitation[1].addEventListener('mouseover', function () {
        cohabitation[0].className += " active";
    });
    cohabitation[0].addEventListener('mouseout', function () {
        cohabitation[1].className = cohabitation[1].className.replace(" active", "");
    });
    cohabitation[1].addEventListener('mouseout', function () {
        cohabitation[0].className = cohabitation[0].className.replace(" active", "");
    });

    instruction[0].addEventListener('mouseover', function () {
        instruction[1].className += " active";
    });
    instruction[1].addEventListener('mouseover', function () {
        instruction[0].className += " active";
    });
    instruction[0].addEventListener('mouseout', function () {
        instruction[1].className = instruction[1].className.replace(" active", "");
    });
    instruction[1].addEventListener('mouseout', function () {
        instruction[0].className = instruction[0].className.replace(" active", "");
    });

    weight[0].addEventListener('mouseover', function () {
        weight[1].className += " active";
    });
    weight[1].addEventListener('mouseover', function () {
        weight[0].className += " active";
    });
    weight[0].addEventListener('mouseout', function () {
        weight[1].className = weight[1].className.replace(" active", "");
    });
    weight[1].addEventListener('mouseout', function () {
        weight[0].className = weight[0].className.replace(" active", "");
    });

    appearance[0].addEventListener('mouseover', function () {
        appearance[1].className += " active";
    });
    appearance[1].addEventListener('mouseover', function () {
        appearance[0].className += " active";
    });
    appearance[0].addEventListener('mouseout', function () {
        appearance[1].className = appearance[1].className.replace(" active", "");
    });
    appearance[1].addEventListener('mouseout', function () {
        appearance[0].className = appearance[0].className.replace(" active", "");
    });
}

// Наконец, вызываем функцию
main();
// При изменении размера экрана всё может съехать, поэтому нужно всё перерасчитать
window.onresize = main;