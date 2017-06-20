
var level_id = 8;
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

function canvasToB64(canvas) {
  var dataURL = canvas.toDataURL("image/jpg", 1);

  dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  return dataURL;
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  var slice = byteCharacters.slice(offset, offset + sliceSize);

  var byteNumbers = new Array(slice.length);
  for (var i = 0; i < slice.length; i++) {
  byteNumbers[i] = slice.charCodeAt(i);
  }

  var byteArray = new Uint8Array(byteNumbers);

  byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}



function checking() {
  doc.open();
  doc.close();
  execute();
  var img_ex = null;
  var img_sol = null;
  var img = new Image;
  var iframe_ex_body = doc_ex.getElementById('iframe_ex_body');
  var iframe_body = doc.getElementById('iframe_body');
  document.getElementById('head').innerHTML = 'Ваш итоговый результат';
  html2canvas(iframe_ex_body.getElementsByTagName('svg')[0], {
        onrendered: function(canvas) {
          img_ex = canvasToB64(canvas);
          img_ex = b64toBlob(img_ex);
           html2canvas(iframe_body.getElementsByTagName('svg')[0], {
              onrendered: function(canvas) {
                img_sol = canvasToB64(canvas);
                img_sol = b64toBlob(img_sol);
                resemble(img_sol).compareTo(img_ex).onComplete(function(data){                  
                  img.src = data.getImageDataUrl();
                  img.style.margin = '-10px';                
                  iframe_body.innerHTML="";
                  iframe_body.appendChild(img);
                  var innerr = document.getElementById('inner');
                  var next_btn = document.getElementById('next_btn');
                  var sum = (100-data.misMatchPercentage)/1.1;
                  if (sum > 90) {
                    innerr.style.background = 'green';
                    var i = 2.6*(100-data.misMatchPercentage);
                    innerr.style.width = i+'px';
                    innerr.innerHTML="Отлично "+Math.round(100-data.misMatchPercentage)+"%";
                    next_btn.disabled = false;
                    next_btn.style.background = 'green';

                  } else if ((sum >= 80)&&(sum < 90)) {
                      innerr.style.background = 'green';
                      var i = 2.6*(sum);
                      innerr.style.width = i+'px';
                      innerr.innerHTML="Хорошо "+Math.round(sum)+"%";
                      next_btn.disabled = false;
                      next_btn.style.background = 'green';
                    } else if ((sum >= 50)&&(sum < 80)) {
                        innerr.style.background = 'orange';
                        var i = 2.6*(sum);
                        innerr.style.width = i+'px';
                        innerr.innerHTML="Не очень "+Math.round(sum)+"%";
                        next_btn.disabled = true;
                        next_btn.style.background = 'grey';
                      } else if (sum < 50) {
                          innerr.style.background = 'red';
                          var i = 2.6*(sum);
                          innerr.style.width = i+'px';
                          innerr.innerHTML="Плохо "+Math.round(sum)+"%";
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
  editor.setValue(" ");
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
      task.innerHTML = "Нарисуйте круг  с координатами центра (150; 70), радиусом 60, цветом линии зеленым, шириной линии 2px и желтой заливкой";
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
        level.innerHTML = level_id + '/6';
        break;
    case 3:
        task_h2.innerHTML = "Третий уровень";
        theory.innerHTML = "На следующем этапе мы будем создавать прямоугольник. Подход такой же, так все просто:)<br />            d3.select('body') // выбор в документе body<br />&emsp;.append('svg') // добавление в body svg-контейнера, система координат начинается с верхнего левого угла и идет вправо вниз<br />&emsp;.append('rect') // добавление фигуры прямоугольник <br>&emsp;.attr('x', 10) // задание x-координаты левого верхнего угла <br />&emsp;.attr('y', 10) // задание y-координаты левого верхнего углв <br />&emsp;.attr('width', 100) // задание ширины прямоугольника <br />&emsp;.attr('height', 100) // задание высоты прямоугольника<br />&emsp;.attr('rx', 5) //дополнительно можно задать радиус для углов прямоугольника<br>&emsp;.style('stroke-width', '2') // задание толщины линии <br />&emsp;.style('stroke', 'black') // Задание цвета линии <br>&emsp;.style('fill', 'red') // задание цвета заливки прямоугольника<br />";
        task.innerHTML = "Постройте прямоугольник с координатами начала (5;5), шириной 60, высотой 150, зеленого цвета, с линией обводки толщиной 5px, цвет линии красный. Также укажите радиус углов - 5px. P.S. Для выполнения этой задачи потребуется установить ширину и высоту svg-контейнера, рекомендуемые значения (400, 300) соответсвенно.";
        var code_ex = "d3.select('body')    .append('svg')    .attr('width', 400)    .attr('height', 300)    .append('rect')    .attr('x', 5)    .attr('y', 5)    .attr('width', 60)    .attr('height', 150)    .attr('rx', 5)    .style('stroke', 'red')    .style('stroke-width', '5')    .style('fill', 'green');"
          doc_ex.open();
          doc_ex.write('<script> function main(){')
          doc_ex.write(code_ex);
          doc_ex.write('}</script>');
          doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
          doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
          doc_ex.write('<script>main()</script>')
          doc_ex.write('</body>')
          doc_ex.close();
          level.innerHTML = level_id + '/6';
          break;
    case 4:
        task_h2.innerHTML = "Четвертый уровень";
        theory.innerHTML = "Дальше - интересней. Учимся рисовать многоугольники<br />            d3.select('body') // выбор в документе body<br />&emsp;.append('svg') // добавление в body svg-контейнера, система координат начинается с верхнего левого угла и идет вправо вниз<br />&emsp;.append('polygon') // добавление polygon для рисования многоугольника <br>&emsp;.attr('points', '50,250 150,50 250,250') // задание массива точек, по которому строится многоугольник <br />&emsp;.style('stroke-width', '2') // задание толщины линии <br />&emsp;.style('stroke', 'green') // Задание цвета линии <br>&emsp;.style('fill', 'yellow') // задание цвета заливки многоугольника<br />";
        task.innerHTML = "Постройте многоугольник с координатами (50,250 150,50 250,250). толщиной линии 3px, зеленым цветом линии и синей заливкой. P.S. Для выполнения этой задачи потребуется установить ширину и высоту svg-контейнера, рекомендуемые значения (400, 300) соответсвенно.";
        var code_ex = "d3.select('body')    .append('svg')    .attr('width', 400)    .attr('height', 300)    .append('polygon')    .attr('points', '50,250 150,50 250,250')    .style('stroke', 'green')    .style('stroke-width', '3')    .style('fill', 'blue');"
          doc_ex.open();
          doc_ex.write('<script> function main(){')
          doc_ex.write(code_ex);
          doc_ex.write('}</script>');
          doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
          doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
          doc_ex.write('<script>main()</script>')
          doc_ex.write('</body>')
          doc_ex.close();
          level.innerHTML = level_id + '/6';
          break;

    case 5:
        task_h2.innerHTML = "Пятый уровень";
        theory.innerHTML = " А теперь кое-что посложнее. Будем учиться создавать группы объектов. Такие группы создаются с помощью элемента g<br /> var g = d3.select('body').append('svg').attr('width', 400).attr('height, 300).append('g') Далее добавляем в группу элементы.<br>g.append('circle')<br>&emsp;.attr('cx', 100)<br /> &emsp;.attr('cy', 100)<br> &emsp;.attr('r', 50)<br>g.append('rect')<br>&emsp;.attr('x', 30)<br /> &emsp;.attr('y', 20)<br> &emsp;.attr('width', 100)<br> &emsp;.attr('height', 100)<br> ";
        task.innerHTML = "Постройте группу, которая содержит круг с параметрами: розовая заливка, синяя линия обводки, толщина линии:2, координаты центра (100, 100), радиус 60. И прямоугольник: заливка желтая, обводка синяя, толщина линии: 2, координаты (30,20), ширина 100, высота 120, радиус скругления углов 5. ";
        var code_ex = 'var g = d3.select("body").append("svg").attr("width", 400).attr("height",300).append("g");    g.append("circle")    .style("fill", "pink")    .style("stroke", "blue")    .style("stroke-width", "2")    .attr("cx", 100)    .attr("cy", 100)    .attr("r", 60);   g.append("rect")    .style("fill", "yellow")    .style("stroke", "red")    .style("stroke-width", "2")    .attr("x", 30)    .attr("y", 20)    .attr("width", 100)    .attr("height", 120)    .attr("rx", 5);'
          doc_ex.open();
          doc_ex.write('<script> function main(){')
          doc_ex.write(code_ex);
          doc_ex.write('}</script>');
          doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
          doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
          doc_ex.write('<script>main()</script>')
          doc_ex.write('</body>')
          doc_ex.close();
          level.innerHTML = level_id + '/6';
          break;
      case 6:
        task_h2.innerHTML = "Шестой уровень";
        theory.innerHTML = "Наш курс подходит к концу и пора отправляться в свободное плаванье! Удачи:)";
        task.innerHTML = "Повторите иозброжание, указанное в примере";
        var code_ex = 'var g = d3.select("body").append("svg").attr("width", 400).attr("height",300).append("g");   g.append("rect")    .style("fill", "white")   .style("stroke", "red")   .style("stroke-width", "2")   .attr("x", 50)    .attr("y", 100)   .attr("width", 150) .attr("height", 150)    .attr("rx", 5);   g.append("polygon")    .attr("points", "50,100 125,50 200,100")  .style("stroke-width", "2")  .style("stroke", "green")   .style("fill", "white");    g.append("rect")    .style("fill", "white")   .style("stroke", "blue")    .style("stroke-width", "2")   .attr("x", 100)   .attr("y", 150)   .attr("width", 50)    .attr("height",50)    .attr("rx", 10);    g.append("circle")    .style("fill", "yellow")    .style("stroke", "orange")    .style("stroke-width", "2")     .attr("cx", 250)    .attr("cy", 50)   .attr("r", 40);'
          doc_ex.open();
          doc_ex.write('<script> function main(){')
          doc_ex.write(code_ex);
          doc_ex.write('}</script>');
          doc_ex.write('<script src="http://d3js.org/d3.v3.min.js"></script>')
          doc_ex.write('<body id="iframe_ex_body" style="margin:0; padding: 10px;">')
          doc_ex.write('<script>main()</script>')
          doc_ex.write('</body>')
          doc_ex.close();
          level.innerHTML = level_id + '/6';
          break;
      default:
        task_h2.innerHTML = "Финал<br>Поздравляем! Вы успешно окончили наш курс!!";
        var fin_img = new Image;
        fin_img.src = "1.jpg";
        fin_img.classList.add("img_1");
        theory.innerHTML = "";
        theory.appendChild(fin_img);
        task.innerHTML = " ";
        level.innerHTML=" ";
  }
}

