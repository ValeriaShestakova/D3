
var level_id = 1;
var editor = ace.edit("editor"); // теперь обращаться к редактору будем через editor
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
document.getElementById('editor').style.fontSize='14px';


var iframe_ex = document.getElementsByTagName('iframe')[1];
var doc_ex = iframe_ex.contentDocument ||
  iframe_ex.contentWindow.document;


var iframe = document.getElementsByTagName('iframe')[0];
var doc = iframe.contentDocument ||
  iframe.contentWindow.document;

var code_ex = 'd3.select("body")    .append("svg")    .append("line")    .attr("x1", 10)    .attr("y1", 10)     .attr("x2", 250)    .attr("y2", 300)    .style("stroke", "red")    .style("stroke-width", "4");'

      doc_ex.open();
      doc_ex.write('<script> function main(){')
      doc_ex.write(code_ex);
      doc_ex.write('}</script>');
      doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
      doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
      doc_ex.write('<script>main()</script>')
      doc_ex.write('</body>')
      doc_ex.close();


 function execute() {
  document.getElementById('head').innerHTML = 'Результат выполнения кода';
  doc.open();
  doc.write('<script> function main(){')
  doc.write(editor.getValue());
  doc.write('}</script>');
  doc.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
  doc.write('<body id="iframe_body" style="margin:0; padding: 10px;">')
  doc.write('<script>main()</script>')
  doc.write('</body>')
  doc.close();
};





function checking() {
  var img_ex = null;
  var img_sol = null;
  var img = new Image;
  var iframe_ex_body = doc_ex.getElementById('iframe_ex_body');
  var iframe_body = doc.getElementById('iframe_body');
  document.getElementById('head').innerHTML = 'Ваш итоговый результат';
  html2canvas(iframe_ex_body, {
        onrendered: function(canvas) {
          img_ex = canvas.toDataURL('image/png', 1);
           html2canvas(iframe_body, {
              onrendered: function(canvas) {
                img_sol = canvas.toDataURL('image/png', 1);
                //window.open(img_ex);
                //window.open(img_sol);
                resemble(img_sol).compareTo(img_ex).onComplete(function(data){                  
                  img.src = data.getImageDataUrl();
                  console.log(img);
                  img.style.margin = '-10px';                
                  iframe_body.innerHTML="";
                  iframe_body.appendChild(img);
                  var innerr = document.getElementById('inner');
                  var next_btn = document.getElementById('next_btn');
                  if (data.misMatchPercentage < 1) {
                    innerr.style.background = 'green';
                    var i = 2.6*(100-data.misMatchPercentage);
                    innerr.style.width = i+'px';
                    innerr.innerHTML="Отлично "+Math.round(100-data.misMatchPercentage)+"%";
                    next_btn.disabled = false;
                    next_btn.style.background = 'green';
                  } else if ((data.misMatchPercentage >= 1)&&(data.misMatchPercentage < 20)) {
                      innerr.style.background = 'green';
                      var i = 2.6*(100-data.misMatchPercentage);
                      innerr.style.width = i+'px';
                      innerr.innerHTML="Хорошо "+Math.round(100-data.misMatchPercentage)+"%";
                      next_btn.disabled = false;
                      next_btn.style.background = 'green';
                    } else if ((data.misMatchPercentage >= 20)&&(data.misMatchPercentage < 60)) {
                        innerr.style.background = 'orange';
                        var i = 2.6*(100-data.misMatchPercentage);
                        innerr.style.width = i+'px';
                        innerr.innerHTML="Не очень "+Math.round(100-data.misMatchPercentage)+"%";
                        next_btn.disabled = true;
                        next_btn.style.background = 'grey';
                      } else if (data.misMatchPercentage >= 60) {
                          innerr.style.background = 'red';
                          var i = 2.6*(100-data.misMatchPercentage);
                          innerr.style.width = i+'px';
                          innerr.innerHTML="Плохо "+Math.round(100-data.misMatchPercentage)+"%";
                          next_btn.disabled = true;
                          next_btn.style.background = 'grey';
                        };
                });
              }
            });
        }
  });
}

function next() {
  var iframe_ex = document.getElementsByTagName('iframe')[1];
  var doc_ex = iframe_ex.contentDocument ||
  iframe_ex.contentWindow.document;


var iframe = document.getElementsByTagName('iframe')[0];
var doc = iframe.contentDocument ||
  iframe.contentWindow.document;
  level_id = level_id + 1;
  document.getElementById('head').innerHTML = 'Результат выполнения кода';
  doc.open();
  doc.close();
  doc_ex.open();
  doc_ex.close();
  //editor.setValue(" ");
  var task_h2 = document.getElementById('task_h2');
  var theory = document.getElementById('theory');
  var task = document.getElementById('task');
  var level = document.getElementById('level');
  var innerr = document.getElementById('inner');
  var next_btn = document.getElementById('next_btn');
  innerr.style.width = '90px';
  innerr.innerHTML="Плохо";
  next_btn.disabled = true;
  next_btn.style.background = 'grey';
  switch(level_id) {
    case 2:
      task_h2.innerHTML = "Второй уровень";
      theory.innerHTML = "Далее мы попробуем создать круг. Подход такой же, так что ничего сложного:)<br />            d3.select('body') // выбор в документе body<br />&emsp;.append('svg') // добавление в body svg-контейнера, система координат начинается с верхнего левого угла и идет вправо вниз<br />&emsp;.append('circle') // добавление фигуры круг <br>&emsp;.attr('cx', 100) // задание x-координаты центра окружности <br />&emsp;.attr('cy', 100) // задание y-координаты центра окружности <br />&emsp;.attr('r', 50) // задание радиуса окружности <br />&emsp;.style('stroke', 'blue') // задание цвета линии<br />&emsp;.style('stroke-width', '2') // задание толщины линии <br />&emsp;.style('fill', 'red') // задание цвета заливки окружности<br />";
      task.innerHTML = "hfgvbdfds";
      var code_ex = "d3.select('body')            .append('svg')            .append('circle')            .attr('cx', 150)            .attr('cy', 70)            .attr('r', 60)            .style('stroke', 'green')            .style('stroke-width', '2')            .style('fill', 'yellow');"
        doc_ex.open();
        doc_ex.write('<script> function main(){')
        doc_ex.write(code_ex);
        doc_ex.write('}</script>');
        doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
        doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
        doc_ex.write('<script>main()</script>')
        doc_ex.write('</body>')
        doc_ex.close();
        level.innerHTML = level_id + '/10';
        break;
    case 3:
        task_h2.innerHTML = "Третий уровень";
        theory.innerHTML = "На следующем этапе мы будем создавать прямоугольник. Подход такой же, так все просто:)<br />            d3.select('body') // выбор в документе body<br />&emsp;.append('svg') // добавление в body svg-контейнера, система координат начинается с верхнего левого угла и идет вправо вниз<br />&emsp;.append('rect') // добавление фигуры прямоугольник <br>&emsp;.attr('x', 10) // задание x-координаты левого верхнего угла <br />&emsp;.attr('y', 10) // задание y-координаты левого верхнего углв <br />&emsp;.attr('width', 100) // задание ширины прямоугольника <br />&emsp;.style('height', 100) // задание высоты прямоугольника<br />&emsp;.style('rx', 5) //дополнительно можно задать радиус для углов прямоугольника<br>&emsp;.style('stroke-width', '2') // задание толщины линии <br />&emsp;.style('stroke', 'black') // Задание цвета линии <br>&emsp;.style('fill', 'red') // задание цвета заливки прямоугольника<br />";
        task.innerHTML = "остройте прямоугольник с координатами начала (5;5), шириной 60, высотой 150, зеленого цвета, с линией бводки толщиной 5px, цвет линии красный. Также укажите радиус углов - 5px. P.S. Для выполнения этой задачи потребуется установить ширину и высоту svg-контейнера, рекомендуемые значения (400, 300) соответсвенно.";
        var code_ex = "d3.select('body')    .append('svg')    .append('rect')    .attr('x', 5)    .attr('y', 5)    .attr('width', 60)    .attr('height', 150)    .attr('rx', 5)    .style('stroke', 'red')    .style('stroke-width', '5')    .style('fill', 'green');"
          doc_ex.open();
          doc_ex.write('<script> function main(){')
          doc_ex.write(code_ex);
          doc_ex.write('}</script>');
          doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
          doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
          doc_ex.write('<script>main()</script>')
          doc_ex.write('</body>')
          doc_ex.close();
          level.innerHTML = level_id + '/10';
          break;
  }
}


/* d3.select("body") // выбор в документе body
 .append("svg") // добавление в body svg-контейнера
 .append("rect") // добавление фигуры прямоугльник 
 .attr("width", 50) // задание ширины 
 .attr("height", 200) // задание высоты 
 .style("fill", "blue") */