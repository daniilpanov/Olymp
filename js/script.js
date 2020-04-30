// Не знаю, можно ли было реализовать это в css, но... теперь это уже не важно))
// Итак, этот скрипт предназначем для того, чтобы при переполнении контента элементов класса breed-features__item,
// эти эдементы не сдвигались. Они не расширяются, расширяются пустые элементы с теми же свойствами, что и у них
function main() {
    // Поскольку у пустых элементов те же классы, получаем и пустые элементы, и элементы с текстом
    // Таким образом, получается массив
    // elements = [[<cohabitation>, <cohabitation_empty>], [<instruction>, <instruction_empty>], и т.д....]
    var elements = [
        document.getElementsByClassName("breed-features__item--cohabitation"),
        document.getElementsByClassName("breed-features__item--instruction"),
        document.getElementsByClassName("breed-features__item--weight"),
        document.getElementsByClassName("breed-features__item--appearance")
    ];

    // Перебираем массив и для каждого элемента делаем следующее
    for (var i in elements) {
        if (!elements.hasOwnProperty(i))
            continue;

        // Записываем элемент в переменную
        var el = elements[i];

        // Нужно измерить, сколько пространства будет занимать текст
        el[1].innerHTML = el[0].innerHTML;
        // записываем результаты...
        var additional_height = el[1].clientHeight - el[0].clientHeight;

        // Далее возвращаемся к исходному виду пустых элементов
        el[1].innerHTML = "";
        // и добавляем необходимые стили, чтобы текст, выходящий за пределы предшествующих блоков, был "на" пустых блоках.
        // Таким образом кажется, что увеличиваются блоки, в которых содержится текст,
        // но на самом деле увеличиваются эти, а не те. Надеюсь, Вы хотя бы примерно меня поняли))

        // Ширина...
        el[1].style.maxWidth
            = el[1].style.width
            = (el[0].clientWidth + 20).toString() + "px";
        // Высота...
        el[1].style.height = additional_height.toString() + "px";
        // Позиция...
        el[1].style.top = (el[0].offsetTop + el[0].clientHeight).toString() + "px";
        el[1].style.left = (el[0].offsetLeft - 10).toString() + "px";

        // Записываем в свойство индекс элемента, чтобы была возможность получить этот элемент из функции (см. ниже)
        el[0].i = i;
        el[1].i = i;

        // Нужно, чтобы :hover срабатывал на элементах (пустом и с текстом) синхронно
        el[0].addEventListener('mouseover', function (ev) {
            elements[ev.target.i][1].className += " active";
        });
        el[1].addEventListener('mouseover', function (ev) {
            elements[ev.target.i][0].className += " active";
        });
        el[0].addEventListener('mouseout', function (ev) {
            elements[ev.target.i][1].className = elements[ev.target.i][1]
                .className.replace(" active", "");
        });
        el[1].addEventListener('mouseout', function (ev) {
            elements[ev.target.i][0].className = elements[ev.target.i][0]
                .className.replace(" active", "");
        });
    }
}

// Наконец, вызываем функцию
main();
// При изменении размера экрана всё может съехать, поэтому нужно всё перерасчитать
window.onresize = main;