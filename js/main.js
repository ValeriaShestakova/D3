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

var code_ex = 'd3.select("body")    .append("svg")    .append("rect")    .attr("width", 50)    .attr("height", 200)    .style("fill", "blue");'

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
  var iframe = document.getElementsByTagName('iframe')[0];
  var doc = iframe.contentDocument ||
  iframe.contentWindow.document;
  var iframe_ex = document.getElementsByTagName('iframe')[1];
  var doc_ex = iframe_ex.contentDocument ||
    iframe_ex.contentWindow.document;
  var img_ex = new Image;
  var img_sol = new Image;
  var img = new Image;
  var iframe_ex_body = doc_ex.getElementById('iframe_ex_body');
  var iframe_body = doc.getElementById('iframe_body');
  document.getElementById('head').innerHTML = 'Ваш итоговый результат';
  html2canvas(iframe_ex_body, {
        onrendered: function(canvas) {
          img_ex = canvas.toDataURL('image/png', 1);
          //iframe_ex_body.appendChild(canvas);
           html2canvas(iframe_body, {
              onrendered: function(canvas) {
                img_sol = canvas.toDataURL('image/png', 1);
                //iframe_body.appendChild(canvas);
                resemble(img_ex).compareTo(img_sol).onComplete(function(data){
                  //window.open(img_ex, 'пример');
                  //window.open(img_sol, 'решене');
                  img.src = data.getImageDataUrl();
                  img.style.margin = '-10px';                //example.innerHTML = data.isSameDimensions;
                  iframe_ex_body.innerHTML="";
                  iframe_ex_body.appendChild(img);
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
                        data = null;
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
  document.getElementById('head').innerHTML = 'Пример';
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
      theory.innerHTML = "dgdx";
      task.innerHTML = "hfgvbdfds";
      var code_ex = 'd3.select("body")    .append("svg")    .append("rect")    .attr("width", 50)    .attr("height", 200)    .style("fill", "red");'
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
        theory.innerHTML = "dgdx";
        task.innerHTML = "hfgvbdfds";
        var code_ex = "d3.select('body')    .append('svg')    .append('rect')    .attr('width', 50)    .attr('height', 200)    .style('fill', 'green');"
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