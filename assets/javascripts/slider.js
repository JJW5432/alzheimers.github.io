
  var rad = Math.PI / 180;
  Raphael.fn.sector = function (cx, cy, r, startAngle, endAngle, params) {
          var x1 = cx + r * Math.cos(-startAngle * rad),
          x2 = cx + r * Math.cos(-endAngle * rad),
          y1 = cy + r * Math.sin(-startAngle * rad),
          y2 = cy + r * Math.sin(-endAngle * rad);
      return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
  }

    

  var size=800
  

  var paper = Raphael(document.getElementById("slider"), size, size);

  s = paper.set()
  p = paper.set()
  s.push(paper.sector(200, 30, 25, 0, 180, {"fill": "red", "stroke": "none"}) )
  r = paper.rect(175,30, 50, 550).attr({"fill":"90-green:0-yellow:50-red:100", "stroke":"none"})
  p.push(paper.sector(200, 575, 25, 180, 360, {"fill": "green", "stroke": "none"}) )

  slider = paper.set()
  slider.push(s).push(r).push(p)

  starting_percentage = 0.10
  starting = (1 - starting_percentage) * 545
  g = paper.set()
  g.push(c = paper.circle(200,starting+30,25).attr({"fill": "white", "fill-opacity":0} ))
  g.push(t = paper.text(100, starting+30, starting_percentage*100+"%").attr({"font-size": 16*2.6 }))

  var me = g,
        ly = 0,
        oy = 0,
        moveFnc = function(dx, dy) {
          ly = Math.min(545-starting, Math.max(-1*starting, dy + oy))  // do the same for y
          me.transform('t' + 0 + ',' + ly);
          percent = Math.round((1-ly/545)*100-90)
          t.attr("text", percent+"%" )
          console.log(ly)

          if (percent < 11) {reccomendation = "you relax; your risk is very low. You should continue to receive regular testing to ensure that if anything does develop it can be treated immediatly."}
          else if (percent < 45) {reccomendation = "you increase the frequency of the testing you receive; it is likely that you will develop Alzheimer's soon."}
          else if (percent < 80) {reccomendation = "you begin preliminary treatments to reduce the number of plaques and slow neurodegeneration."}
          else {reccomendation = "you begin treatment immediately."}

          $("#reccomendation").text(reccomendation)
        }
        startFnc = function() {}
        endFnc = function() {
          oy = ly;
        };

  c.drag(moveFnc, startFnc, endFnc);
  var e
  slider.click(function () {
    e=event
    console.log(e)
  })

  convert = function (xin) {
    return 100 - (100/435)*(xin-355)
  }
